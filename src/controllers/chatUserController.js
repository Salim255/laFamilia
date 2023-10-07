const pool = require("../config/pool");

exports.createChatUser = async (req, res) => {
  try {
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
  } catch (error) {
    res.send(error);
  }
};

exports.getChatUser = async (req, res) => {
  try {
    const userId = req.user.id;

    //Bring all chatUser associate to the current user
    const { rows } = await pool.query(`SELECT * FROM chatUsers WHERE user_id=$1;`, [userId]);

    res.status(200).json({
      status: "success",
      data: {
        rows,
      },
    });
  } catch (error) {}
};

exports.deleteChatUser = async (req, res) => {
  try {
    const { chatId, chatUserId } = req.params;

    const { rows } = await pool.query(
      `DELETE  FROM chatUsers WHERE user_id = $1  AND chat_id = $2`,
      [chatUserId, chatId],
    );

    res.status(200).json({
      status: "success",
      data: {
        rows,
      },
    });
  } catch (error) {
    res.send(error);
  }
};
