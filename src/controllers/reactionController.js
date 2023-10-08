const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

exports.createReaction = catchAsync(async (req, res, next) => {
  const { type, reaction } = req.body;

  const { postId, commentId, messageId } = req.params;

  if (postId) {
    const { rows } = await pool.query(
      `INSERT INTO reactions (type, reaction, user_id, post_id ) VALUES($1, $2, $3, $4) RETURNING *;`,
      [type, reaction, req.user.id, postId],
    );

    return res.status(201).json({
      status: "success",
      data: {
        rows,
      },
    });
  }

  if (commentId) {
    const { rows } = await pool.query(
      `INSERT INTO reactions (type, reaction, user_id, comment_id ) VALUES($1, $2, $3, $4) RETURNING *;`,
      [type, reaction, req.user.id, commentId],
    );

    return res.status(201).json({
      status: "success",
      data: {
        rows,
      },
    });
  }

  if (messageId) {
    const { rows } = await pool.query(
      `INSERT INTO reactions (type, reaction, user_id, message_id ) VALUES($1, $2, $3, $4) RETURNING *;`,
      [type, reaction, req.user.id, messageId],
    );

    return res.status(201).json({
      status: "success",
      data: {
        rows,
      },
    });
  }

  return;
});
