const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createChat = catchAsync(async (req, res, next) => {
  const { chatType, usersId, chat_name } = req.body;

  const { rows: users } = await pool.query(`SELECT * FROM users`);

  //1)Check if we have at least two users before creating a chat
  if (isEmpty(usersId) || usersId.length < 1) {
    return next(new AppError("Chat needs to have at least two users", 401));
  }

  //2)Check that all usersId still hold their account
  for (let i = 0; i < usersId.length; i++) {
    result = users.filter(element => element.id == usersId[i]);

    if (isEmpty(result)) {
      return next(new AppError("One user or more not exist any more", 401));
    }
  }

  //4)Create chat based on type

  let createdChat;

  //4-1)Create group chat
  if (!isEmpty(chatType)) {
    const { rows } = await pool.query(
      `INSERT INTO chats, chat_name=$2 (type,chat_name) VALUES($1) RETURNING id, type;`,
      [chatType, chat_name],
    );

    createdChat = rows[0];
  } else if (isEmpty(chatType)) {
    //If chat of type dual, check if the two users already in chat or not

    const { rows: partnerPared } = await pool.query(
      `SELECT chats.* ,
        
         JSON_AGG(chatUsers.*) AS chatUsers
  
         FROM chats
  
         JOIN chatUsers On chats.id=chatUsers.chat_id
  
         JOIN users ON users.id=$1
  
         WHERE chats.type='dual' AND chatUsers.user_id=$2
  
         GROUP BY chats.id 
        
     `,
      [req.user.id, usersId[1]],
    );

    //If they are in chat, then return
    if (!isEmpty(partnerPared)) {
      return next(new AppError("You are already in chat with this user ", 401));
    }

    const { rows } = await pool.query(`INSERT INTO chats VALUES(DEFAULT) RETURNING id, type`);
    createdChat = rows[0];
  }

  req.body.createdChatId = createdChat.id;

  req.body.usersIdList = usersId;

  next();
});

exports.getChatsByUser = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(
    `SELECT   chats.* , 

      COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE   chatUsers.user_id=$1 )) AS chatUser,

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
