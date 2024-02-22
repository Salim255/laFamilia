const AppError = require("../utils/appError");

require("dotenv").config();

const handleInvalIdIdDB = err => {
  //"Key (post_id)=(2) is not present
  let value = err.detail.match(/\(([^()]*)\)/g);
  value = value.map(x => x.replace(/[()]/g, ""));

  const message = `Invalid ${value[0]}: ${value[1]}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = err => {
  let value = err.detail.match(/\(([^()]*)\)/g);

  value = value.map(x => x.replace(/[()]/g, ""));

  const message = `Duplicate field value: ${value[1]}. Please use another value!`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak the details to the client
  } else {
    //1) Log error
    console.error("Error 💥", err);

    //2)Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  //We set the err.statusCode if its not defined
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    console.log("====================================");
    console.log(error, "Hello hello ");
    console.log("====================================");
    if (error.code === "23503") error = handleInvalIdIdDB(error);

    if (error.code === "23505") error = handleDuplicateFieldDB(error);
    sendErrorProd(error, res);
  }
};
