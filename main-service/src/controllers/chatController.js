const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createDualChat = catchAsync(async (req, res, next) => {
  const { partnerId } = req.body;

  //1)Check if we have at least two users before creating a chat

  if (isEmpty(partnerId)) {
    return next(new AppError("Chat needs to have at least two users", 401));
  }

  const { rows: users } = await pool.query(`SELECT * FROM users WHERE id=$1 OR id=$2`, [
    partnerId,
    req.user.id,
  ]);

  //1)Check if we have at least two users before creating a chat
  if (users.length < 2) {
    return next(new AppError("Chat needs to have at least two users", 401));
  }

  //4)Create chat based on type
  let createdChat;

  //Check if they are not already in a chat
  const { rows: result } = await pool.query(
    `SELECT chat_id
        FROM chatUsers
         WHERE user_id IN ($1, $2)
          GROUP BY chat_id
          HAVING COUNT(DISTINCT user_id) = 2
     `,
    [req.user.id, partnerId],
  );

  //If they are in chat, then return
  if (result.length > 0) {
    return next(new AppError("You are already in chat with this user ", 401));
  }

  const { rows } = await pool.query(`INSERT INTO chats VALUES(DEFAULT) RETURNING id, type`);
  createdChat = rows[0];

  req.body.chat_id = createdChat.id;

  req.body.usersIdList = [req.user.id, partnerId];

  next();
});

exports.getChatsByUser = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(
    `SELECT   chats.* , 

      COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE   chatUsers.user_id!=$1 )) AS chatUser,

      COALESCE(JSON_AGG( users.* ) FILTER (WHERE chatUsers.user_id!=$1))  AS users,

      JSON_AGG(DISTINCT messages.*) AS messages

      FROM chats
      
      JOIN chatUsers ON chats.id = chatUsers.chat_id   

      JOIN users ON chatUsers.user_id = users.id

      JOIN messages ON messages.chat_id = chats.id
      
   
       
      GROUP BY chats.id

      ORDER BY chats.id ;

    
      
       `,
    [req.user.id],
  );

  let data = rows.filter(chat => chat.chatuser != null);
  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.getChatByChatId = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { rows } = await pool.query(
    `SELECT   chats.* , 

      COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE   chatUsers.user_id=$1 )) AS chatUser,

      COALESCE(JSON_AGG( users.* ) FILTER (WHERE chatUsers.user_id!=$1))  AS users,

      JSON_AGG(DISTINCT messages.*) AS messages

      FROM chats
      
     

      JOIN chatUsers ON chats.id = chatUsers.chat_id   

      JOIN users ON chatUsers.user_id = users.id

      JOIN messages ON messages.chat_id = chats.id
      
      WHERE chats.id = $2
       
      GROUP BY chats.id

      ORDER BY chats.id ;

    
      
       `,
    [req.user.id, chatId],
  );

  res.status(200).json({
    status: "success",
    data: rows,
  });
});
exports.deleteChat = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const { rows } = await pool.query(`DELETE FROM chats WHERE chats.id = $1`, [chatId]);

  res.status(204).json({
    status: "success",
    data: rows,
  });
});

exports.countChats = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM chats;`);

  return parseInt(rows[0].count);
};
