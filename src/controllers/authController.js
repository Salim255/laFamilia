const pool = require("../config/pool");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const isEmpty = require("../utils/isEmpty");

const validator = require("validator");

const tokenConfig = require("../config/token");

const createToken = userId => {
  return jwt.sign({ id: userId }, tokenConfig.tokenJWT, { expiresIn: tokenConfig.tokenEXP });
};

const correctPassword = async (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email) || isEmpty(password)) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    //Check if user exist and password is correct
    const { rows: user } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    const correct = await correctPassword(password, user[0].password);

    if (!correct || isEmpty(user[0])) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    //If everything ok, send token to client
    const token = createToken(user[0].id);

    res.status(200).json({
      message: "success",
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (
      !validator.isEmail(email) ||
      isEmpty(password) ||
      isEmpty(first_name) ||
      isEmpty(last_name)
    ) {
      return res.status(401).json({
        status: "fail",
        message: "User information error",
      });
    }

    //Check if the email already used
    const { rows: user } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    //If email already used
    if (!isEmpty(user[0])) {
      return res.status(401).json({
        status: "fail",
        message: "duplicate key value violates unique constraint users_email_key",
      });
    }

    //If not, create new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
         VALUES 
            ($1, $2, $3, $4) RETURNING *;`,
      [first_name, last_name, email, hashedPassword],
    );

    //Create token
    const token = createToken(rows[0].id);

    res.status(200).json({
      message: "success",
      data: {
        token: token,
        user: rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
