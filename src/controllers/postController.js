const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.createPost = catchAsync(async (req, res, next) => {
  const { captions } = req.body;

  if (isEmpty(captions)) {
    return next(new AppError("Post must have captions", 401));
  }

  const { rows } = await pool.query(
    `INSERT INTO posts (captions, user_id) VALUES($1, $2) RETURNING *;`,
    [captions, req.user.id],
  );

  res.status(201).json({
    status: "success",
    data: {
      rows,
    },
  });
});
