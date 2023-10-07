const pool = require("../config/pool");

exports.updateUser = async (req, res) => {
  try {
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
  } catch (error) {
    res.send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT last_name, first_name, photo FROM users;`);

    console.log("Users Hello users ");
    res.status(200).json({
      status: "success",
      data: {
        rows,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { rows } = await pool.query(`DELETE FROM users WHERE id = $1`, [req.user.id]);

    res.status(204).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.send(error);
  }
};
