require("dotenv").config();

const pool = require("../config/pool");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const isEmpty = require("../utils/isEmpty");

const validator = require("validator");

const tokenConfig = require("../config/token");

const cookieConfig = require("../config/cookie");

const { promisify } = require("util");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");
const NatsWrapper = require("../../nats-wrapper");

const Publisher = require("../events/publish");
const createToken = userId => {
  //console.log(tokenConfig.tokenJWT, id, "Salim😡😡😡", process.env.JWT_SECRET);
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

  console.log("====================================");
  console.log(rows[0].id, "hello ", Publisher);
  console.log("====================================");
  //Create token
  const token = createToken(rows[0].id);

  //To send a cookie, all we have to do is to attach it to the response object,
  // So we say res.cookie, and all what we have to do is to specify the name of the cookie, then the data that we want to send in the cookie, options for the cookie
  const cookieOptions = {
    expires: new Date(Date.now() + cookieConfig.cookieEXP * 24 * 60 * 60 * 1000), //Date in millisecond
    //secure: false, //By this cookie will be send only in on an encrypted connection, HHTPS
    httpOnly: true, //This will make it so that cookie cannot be accessed or modified in any way by the browser, this important to prevent CSS attack, so the browser can do , is to receive the cookie, store it then send it back with every request
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //const Context = require("../context");
  await new Publisher(NatsWrapper.getClient()).publish(rows[0]);
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
