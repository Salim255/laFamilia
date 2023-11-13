const catchAsync = require("../utils/catchAsync");
const pool = require("../config/pool");

exports.getUserPhotos = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "hello world",
  });
});

exports.createUserPhoto = async ({ userId, photo_url }) => {
  console.log("====================================");
  console.log(pool, "hello");

  console.log("====================================");
  const { rows } = await pool.query(
    `INSERT INTO photos (photo_url ,user_id )
  VALUES($1, $2) RETURNING *; 
  `,
    [photo_url, userId],
  );

  return rows[0];
};
