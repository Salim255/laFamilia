const pool = require("../config/pool");

const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
  const { last_name, first_name } = req.body;

  const { rows } = await pool.query(
    `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING last_name, first_name, photo ;`,
    [first_name, last_name, req.user.id],
  );

  res.status(200).json({
    status: "success",
    data: {
      rows,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(`SELECT last_name, first_name, id, photo FROM users;`);

  res.status(200).json({
    status: "success",
    data: rows,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  const { rows } = await pool.query(
    `SELECT last_name, first_name, id, photo FROM users WHERE id=$1;`,
    [userId],
  );

  console.log(rows);
  res.status(200).json({
    status: "success",
    data: rows,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { rows } = await pool.query(`DELETE FROM users WHERE id = $1`, [req.user.id]);

  res.status(204).json({
    status: "success",
    data: rows,
  });
});

exports.countUsers = async () => {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM users;`);

  return parseInt(rows[0].count);
};
