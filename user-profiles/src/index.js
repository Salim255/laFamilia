const express = require("express");
const { json } = require("body-parser");
//import { json } from "body-parser";

const app = express();

app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("hi there");
});
app.listen(6001, () => {
  console.log("====================================");
  console.log("Listening on port 6000! !!!!!!!");
  console.log("====================================");
});
