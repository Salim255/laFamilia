const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createMessage = catchAsync(async (req, res, next) => {
  const { chat_id, message: content } = req.body;

  const fromUserId = req.user.id;

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
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chat_id } = req.body;

  if (isEmpty(chat_id)) {
    return next(new AppError("Not chat found", 404));
  }

  const { rows } = await pool.query(
    `SELECT * FROM messages WHERE chat_id=$1 ORDER BY create_at ASC`,
    [chat_id],
  );

  res.status(200).json({
    status: "success",
    data: rows,
  });
});
