const pool = require("../config/pool");

const catchAsync = require("../utils/catchAsync");

exports.createChatUser = catchAsync(async (req, res) => {
  const { createdChatId, usersIdList } = req.body;

  for (let i = 0; i < usersIdList.length; i++) {
    const { rows } = await pool.query(
      `INSERT INTO chatUsers (user_id, chat_id) VALUES($1, $2) RETURNING *;`,
      [usersIdList[i], createdChatId],
    );
  }

  const { rows } = await pool.query(
    `SELECT chatUsers.id AS  chatUser_id, user_id, chat_id,first_name,last_name,photo,type
    FROM chatUsers
    JOIN users ON users.id = chatUsers.user_id 
    JOIN chats On chats.id = $1 WHERE chat_id=$1`,
    [createdChatId],
  );

  res.status(200).json({
    status: "success",
    data: {
      createdChat: rows,
    },
  });
});

exports.getChatUser = catchAsync(async (req, res) => {
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

exports.deleteChatUser = catchAsync(async (req, res) => {
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
