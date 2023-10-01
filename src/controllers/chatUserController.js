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

    //const { rows } = await pool.query(`SELECT * FROM chatUsers WHERE chat_id=$1;`, [createdChatId]);

    /*   "id": 33,
    "create_at": "2023-10-01T20:46:36.889Z",
    "updated_at": "2023-10-01T20:46:36.889Z",
    "user_id": 1,
    "chat_id": 33,
    "first_name": "salim",
    "last_name": "hassan",
    "photo": null,
    "email": "s@gmail.com",
    "password": "$2a$12$JruI1z.MEPoUKp4SscQ/GuYciTLDIzvaWPiJKNFWOm/tmy2fthRxm",
    "type": "dual */
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

    console.log("====================================");
    console.log(rows, "Hllo world ");
    console.log("====================================");
    res.status(200).json({
      status: "success",
      data: {
        userId,
      },
    });
  } catch (error) {}
};
