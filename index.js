const app = require("./src/app.js");

const appConfig = require("./src/config/app");

const dbConfig = require("./src/config/db");

const pool = require("./src/config/pool");

const port = appConfig.appPort || 3000;

let server;

pool
  .connect({
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    database: dbConfig.dbDatabase,
    user: dbConfig.dbUser,
    password: "",
  })
  .then(() => {
    server = app().listen(port, () => {
      console.log("====================================");
      console.log(`Server running on port ${port}`);
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
