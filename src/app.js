const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/users");

const postRouter = require("./routes/posts");

const chatRouter = require("./routes/chats");

const commentRouter = require("./routes/comments");

const messageRouter = require("./routes/messages");

const chatUserRouter = require("./routes/chatUsers");

const options = {
  origin: "*",

  credentials: true,
};

module.exports = () => {
  const app = express();

  // 1) Global middleware
  //We use morgan to log the http method, the url, status code, the time it took to response , the response in bit
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  //This will allow 100 requests from the same IP in one hour
  const limiter = rateLimit({
    max: 100, //Max 100 request par hour
    windowMs: 60 * 60 * 1000, //Time in millisecond
    message: "Too many requests from this IP, please try again in an hour",
  });

  app.use("/api", limiter);

  //
  app.use(express.json());

  app.use(cors(options));

  //
  app.use("/api/v1/users", userRouter);

  app.use("/api/v1/posts", postRouter);

  app.use("/api/v1/chats", chatRouter);

  app.use("/api/v1/chatUsers", chatUserRouter);

  app.use("/api/v1/comments", commentRouter);

  app.use("/api/v1/messages", messageRouter);

  //For all https method
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  //Global Errors middleware handler
  app.use(globalErrorHandler);

  return app;
};
