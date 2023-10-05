const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

exports.createReaction = async (req, res) => {
  try {
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

    console.log(type, req.body, commentId);
    res.status(201).json({
      status: "success",
      data: {
        type,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
