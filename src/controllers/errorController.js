module.exports = (err, req, res, next) => {
  //We set the err.statusCode if its not defined
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
