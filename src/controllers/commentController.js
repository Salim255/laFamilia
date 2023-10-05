const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;

    const { postId } = req.params;

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
  } catch (error) {
    res.send(error);
  }
};
