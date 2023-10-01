const pool = require("../config/pool");
const isEmpty = require("../utils/isEmpty");

exports.createMessage = async (req, res) => {
  try {
    const { chat_id, message: content } = req.body;

    const fromUserId = req.user.id;

    console.log(chat_id, content, fromUserId);

    const { rows: createdMessage } = await pool.query(
      `INSERT INTO messages (chat_id, content, fromUserId) VALUES($1, $2, $3) RETURNING *;`,
      [chat_id, content, fromUserId],
    );
    res.status(200).json({
      status: "success",
      data: {
        createdMessage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      message: "Error creating message",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chat_id } = req.body;

    if (isEmpty(chat_id)) {
      return res.status(401).json({
        status: "fail",
        message: "Not chat found",
      });
    }

    const { rows } = await pool.query(`SELECT * FROM messages  WHERE chat_id=$1;`, [chat_id]);
    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (error) {}
};
