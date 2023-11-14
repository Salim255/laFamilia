const catchAsync = require("../utils/catchAsync");
const pool = require("../config/pool");

exports.getUserPhotos = catchAsync(async (req, res, next) => {
  console.log("====================================");

  console.log("====================================");

  res.status(200).json({
    status: "success",
    data: "hello",
  });
});

exports.createUserPhoto = async ({ userId, photo_url }) => {
  console.log("====================================");
  console.log(pool, "hello", userId, photo_url);

  console.log("====================================");
  const { rows } = await pool.query(
    `INSERT INTO photos (photo_url ,user_id )
  VALUES($1, $2) RETURNING *; 
  `,
    [photo_url, userId],
  );
  console.log("====================================");
  console.log(rows);
  console.log("====================================");
  return rows;
};
