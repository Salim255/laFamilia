const pool = require("../config/pool");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const isEmpty = require("../utils/isEmpty");

const validator = require("validator");

const tokenConfig = require("../config/token");

const { promisify } = require("util");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

const createToken = userId => {
  return jwt.sign({ id: userId }, tokenConfig.tokenJWT, { expiresIn: tokenConfig.tokenEXP });
};

const correctPassword = async (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email) || isEmpty(password)) {
    return next(new AppError("Please provide a valid email and password", 400));
  }

  //Check if user exist and password is correct
  const { rows: user } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

  if (isEmpty(user)) {
    return next(new AppError("No user found with that email", 404));
  }

  const correct = await correctPassword(password, user[0].password);

  if (!correct || isEmpty(user[0])) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //If everything ok, send token to client
  const token = createToken(user[0].id);

  res.status(200).json({
    message: "success",
    token,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (!validator.isEmail(email) || isEmpty(password) || isEmpty(first_name) || isEmpty(last_name)) {
    return next(new AppError("Create user information error", 401));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password)
         VALUES 
            ($1, $2, $3, $4) RETURNING id, created_at,updated_at, first_name,photo,email ;`,
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
});

exports.protect = catchAsync(async (req, res, next) => {
  //1)Getting token and check of it's there
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }
  //2)Verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)Check if user still exist
  const { rows } = await pool.query(`SELECT * FROM users  WHERE id = $1;`, [decoded.id]);

  const user = rows[0];

  if (isEmpty(user)) {
    console.log(token, user);
    return next(new AppError("The user belonging to this token does no longer exist", 401));
  }

  //4) Check uf user changed password after the JWT was issued
  req.user = user;

  next();
});
