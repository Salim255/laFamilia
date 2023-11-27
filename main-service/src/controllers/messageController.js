const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createMessage = catchAsync(async (req, res, next) => {
  console.log("Hello create message");
  const { createdChatId: chat_id, content } = req.body;

  const fromUserId = req.user.id;
  console.log(chat_id, content);
  const { rows: createdMessage } = await pool.query(
    `INSERT INTO messages (chat_id, content, from_user_id) VALUES($1, $2, $3) RETURNING *;`,
    [chat_id, content, fromUserId],
  );

  res.status(200).json({
    status: "success",
    data: createdMessage[0],
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  if (isEmpty(chatId)) {
    return next(new AppError("Not chat found", 404));
  }

  const { rows } = await pool.query(
    `SELECT * FROM messages WHERE chat_id=$1 ORDER BY created_at ASC`,
    [chatId],
  );

  res.status(200).json({
    status: "success",
    data: rows,
  });
});
