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
    data: rows[0],
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { captions } = req.body;

  const { postId } = req.params;

  const updated_at = new Date();

  if (isEmpty(captions)) {
    return next(new AppError("Post must have captions", 401));
  }

  const { rows: post } = await pool.query(`SELECT * FROM posts WHERE id=$1`, [postId]);

  if (isEmpty(post)) {
    return next(new AppError(`No post found with the id ${postId}: `, 401));
  }

  const { rows } = await pool.query(
    `UPDATE posts SET captions=$1, updated_at=$2 WHERE id = $3 AND user_id=$4 RETURNING * ;`,
    [captions, updated_at, postId, req.user.id],
  );

  res.status(201).json({
    status: "success",
    data: rows[0],
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE user_id=$1`, [req.user.id]);
  //const { sort } = req.query;

  res.status(200).json({
    status: "success",
    data: rows,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const { rows: post } = await pool.query(`SELECT * FROM posts WHERE id=$1`, [postId]);

  if (isEmpty(post)) {
    return next(new AppError(`No post found with the id ${postId}: `, 401));
  }

  const { rows } = await pool.query(`DELETE FROM posts WHERE id = $2 AND user_id=$1`, [
    req.user.id,
    postId,
  ]);

  res.status(204).json({
    status: "success",
    data: rows[0],
  });
});
