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

    res.status(200).json({
      status: "success",
      data: {
        createdChatId,
      },
    });
  } catch (error) {
    res.send(error);
  }
};
