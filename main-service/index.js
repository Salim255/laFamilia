//Catching Uncaught Exception Errors
process.on("uncaughtException", err => {
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");

  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./src/app.js");

require("dotenv").config();

const appConfig = require("./src/config/app.js");

const dbConfig = require("./src/config/db.js");

const pool = require("./src/config/pool.js");

const { default: migrate } = require("node-pg-migrate");

const NatsWrapper = require("./nats-wrapper.js");
const port = appConfig.appPort || 3000;

let server;
const autoMigration = async () => {
  try {
    // Run our migration programmatically in the new schema
    await migrate({
      schema: "public",

      direction: "up",

      log: () => {}, //By passing empty function to log, there will be no logs to the console

      noLock: true, //By default we should run one migration at the time, we ride that by passing noLock =true, so we can run as many migration we want

      dir: "migrations", //File where our migrations files stored

      /*  databaseUrl: {
        host: dbTestConfig.dbHost,
        port: dbTestConfig.dbPort,
        database: dbTestConfig.dbDatabase,
        user: roleName,
        password: roleName,
      }, */
      databaseUrl: {
        host: "main-db-srv",
        port: dbConfig.dbPort,
        database: "postgres",
        user: "postgres",
        password: "postgres",
      },
    });
  } catch (error) {
    console.log("====================================");
    console.log(error, "Hello connection error🧶🧶🧶");
    console.log("====================================");
  }
};

autoMigration();
/* pool
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
  }); */

if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}

const connectToNats = async () => {
  try {
    console.log("hello 🦺🦺");
    await NatsWrapper.connect("users", "hddhff", "http://nats-srv:4222");
    NatsWrapper._client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => NatsWrapper._client.close());
    process.on("SIGTERM", () => NatsWrapper._client.close());
  } catch (error) {
    console.log(error);
  }
};
connectToNats();

pool
  .connect({
    host: "main-db-srv",
    port: dbConfig.dbPort,
    database: "postgres",
    user: "postgres",
    password: "postgres",
  })
  .then(() => {
    server = app().listen(3000, () => {
      console.log("====================================");
      console.log(`Server running on porttttttttt 3000!!!!!!`);
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