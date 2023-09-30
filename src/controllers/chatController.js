const pool = require("../config/pool");

exports.createChat = async (req, res) => {
  try {
    const { rows: chat } = await pool.query(`INSERT INTO chats VALUES(DEFAULT) RETURNING id;`);

    console.log(chat[0]);
    res.send("Hello Salim");
  } catch (error) {}
};
