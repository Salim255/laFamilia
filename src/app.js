const express = require("express");

const cors = require("cors");

const userRouter = require("./routes/users");

const postRouter = require("./routes/posts");

const chatRouter = require("./routes/chats");

const commentRouter = require("./routes/comments");

const messageRouter = require("./routes/messages");

const options = {
  origin: "*",

  credentials: true,
};

module.exports = () => {
  const app = express();
  //
  app.use(express.json());

  app.use(cors(options));

  //
  app.use("/api/v1/users", userRouter);

  app.use("/api/v1/posts", postRouter);

  app.use("/api/v1/chats", chatRouter);

  app.use("/api/v1/comments", commentRouter);

  app.use("/api/v1/messages", messageRouter);

  return app;
};
