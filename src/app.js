const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

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
  app.all("*", (req, res) => {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server`,
    });
  });

  return app;
};
