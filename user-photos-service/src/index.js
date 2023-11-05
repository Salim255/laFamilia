//Catching Uncaught Exception Errors
process.on("uncaughtException", err => {
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");

  console.log(err.name, err.message);

  process.exit(1);
});

const { json } = require("body-parser");

const app = require("./app");

require("dotenv").config();

const appConfig = require("./config/app");

const dbConfig = require("./config/db");

const pool = require("./config/pool");

const port = appConfig.appPort || 6001;

let server;

pool
  .connect({
    host: "user-photos-db-srv",
    port: dbConfig.dbPort,
    database: "postgres",
    user: "postgres",
    password: "postgres",
  })
  .then(() => {
    server = app().listen(6001, () => {
      console.log("====================================");
      console.log(`Server running on port 6001!!!!!!!!`);
      console.log("====================================");
    });
  })
  .catch(err => {
    console.error(err);
  });

//Centralized method to handle all unhandledRejections  in the application, by listing to unhandledRejections events
process.on("unhandledRejection", err => {
  console.log(err.name, err.message);

  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  //Now we exit the application after unhandledRejections nicely be close the server then exit the application
  server.close(() => {
    //By running server close, we the server a time to finish all request that still pending or being handled at the time.
    process.exit(1);
  });
});
