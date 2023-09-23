const express = require("express");
const core = require("cors");

const options = {
  origin: "*",
  credentials: true,
};

module.exports = () => {
  const app = express();

  app.use(express.json());

  return app;
};
