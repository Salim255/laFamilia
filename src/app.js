const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const AppError = require("./utils/appError");

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

  //We use morgan to log the http method, the url, status code, the time it took to response , the response in bit
  app.use(morgan("dev"));

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
    /*  res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server`,
    }); */

    /*   const err = new Error(`Can't find ${req.originalUrl} on this server`);

    err.status = "fail";

    err.statusCode = 404; */

    //If next function receive an argument, whatever it's, express automatically know that, there is an error,  then will express will skip all other middleware in the stack and go straight to error middleware handler
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  //Errors middleware handler
  app.use((err, req, res, next) => {
    console.log(err.stack);

    //We set the err.statusCode if its not defined
    err.statusCode = err.statusCode || 500;

    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });
  return app;
};
