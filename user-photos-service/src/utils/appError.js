class AppError extends Error {
  constructor(message, statusCode) {
    //We use super to call the parent constructor
    super(message);
    //And message is the only parameters that built in error accept and by calling super(message) we are setting the message to the incoming message

    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    //All error that product by ourself and not coming form third part
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
