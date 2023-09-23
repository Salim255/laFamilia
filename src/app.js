const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
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

  return app;
};
