const pool = require("../config/pool");

const catchAsync = require("../utils/catchAsync");

exports.createChatUser = catchAsync(async (req, res, next) => {
  const { chat_id, usersIdList } = req.body;

  for (let i = 0; i < usersIdList.length; i++) {
    const { rows } = await pool.query(
      `INSERT INTO chatUsers (user_id, chat_id) VALUES($1, $2) RETURNING *;`,
      [usersIdList[i], chat_id],
    );
  }

  const { rows } = await pool.query(
    `SELECT chatUsers.id AS  chatUser_id , user_id, chat_id,type
    FROM chatUsers
    JOIN users ON users.id = chatUsers.user_id 
    JOIN chats On chats.id = $1 WHERE chat_id=$1`,
    [chat_id],
  );

  //Create first message
  const { content } = req.body;
  const fromUserId = req.user.id;
  const { rows: createdMessage } = await pool.query(
    `INSERT INTO messages (chat_id, content, from_user_id) VALUES($1, $2, $3) RETURNING *;`,
    [chat_id, content, fromUserId],
  );

  //Return newly created chat
  const { rows: getChat } = await pool.query(
    `SELECT   chats.* , 

    COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE   chatUsers.user_id!=$1 )) AS chatUser,

    COALESCE(JSON_AGG( users.* ) FILTER (WHERE chatUsers.user_id!=$1))  AS users,

    JSON_AGG(DISTINCT messages.*) AS messages

    FROM chats
    
   
    JOIN chatUsers ON chatUsers.chat_id =chats.id   

    JOIN users ON chatUsers.user_id = users.id

    JOIN messages ON messages.chat_id = chats.id
    
   WHERE chats.id=$2
     
    GROUP BY chats.id

    ORDER BY chats.id ;
    
     `,
    [req.user.id, chat_id],
  );

  res.status(200).json({
    status: "Success",
    data: getChat[0],
  });
});

exports.testRequest = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(
    `SELECT   chats.* , 

      COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE   chatUsers.user_id!=$1 )) AS chatUser,

      COALESCE(JSON_AGG( users.* ) FILTER (WHERE chatUsers.user_id!=$1))  AS users,

      JSON_AGG(DISTINCT messages.*) AS messages

      FROM chats
      
     
      JOIN chatUsers ON chatUsers.chat_id =chats.id   

      JOIN users ON chatUsers.user_id = users.id

      JOIN messages ON messages.chat_id = chats.id
      
     WHERE chats.id=$2
       
      GROUP BY chats.id

      ORDER BY chats.id ;
      
       `,
    [7, 47],
  );

  res.status(200).json({
    status: "success",
    data: rows[0],
  });
});

exports.getChatUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  //Bring all chatUser associate to the current user
  const { rows } = await pool.query(`SELECT * FROM chatUsers WHERE user_id=$1;`, [userId]);

  res.status(200).json({
    status: "success",
    data: {
      rows,
    },
  });
});

exports.deleteChatUser = catchAsync(async (req, res, next) => {
  const { chatId, chatUserId } = req.params;
  const { rows } = await pool.query(`DELETE  FROM chatUsers WHERE user_id = $1  AND chat_id = $2`, [
    chatUserId,
    chatId,
  ]);

  res.status(200).json({
    status: "success",
    data: {
      rows,
    },
  });
});
