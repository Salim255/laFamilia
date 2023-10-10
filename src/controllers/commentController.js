const pool = require("../config/pool");

const catchAsync = require("../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;

  const { postId } = req.params;

  console.log(postId);
  const { rows } = await pool.query(
    `INSERT INTO comments (content, user_id, post_id) VALUES($1, $2, $3) RETURNING *;`,
    [content, req.user.id, postId],
  );

  res.status(201).json({
    status: "success",
    data: {
      rows,
    },
  });
});
