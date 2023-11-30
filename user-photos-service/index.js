//Catching Uncaught Exception Errors
process.on("uncaughtException", err => {
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");

  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./src/app");

require("dotenv").config();

const appConfig = require("./src/config/app");

const dbConfig = require("./src/config/db");

const pool = require("./src/config/pool");

const { default: migrate } = require("node-pg-migrate");

const NatsWrapper = require("./nats-wrapper.js");
const UserImageCreatedListener = require("./src/events/user-image-created-listener");

const port = appConfig.appPort || 6001;

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
        host: "user-photos-db-srv",
        port: dbConfig.dbPort,
        database: "postgres",
        user: "postgres",
        password: "postgres",
      },

      /*  databaseUrl: {
        host: "localhost",
        port: dbConfig.dbPort,
        database: "photos-services",
        user: "salimhassanmohamed",
        password: "",
      }, */
    });
  } catch (error) {
    console.log(error, "Hello connection error🧶🧶🧶");
  }
};

//autoMigration();

if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined");
}

const connectToNats = async () => {
  try {
    await NatsWrapper.connect("users", "hddhffr", "http://nats-srv:4222");
    NatsWrapper._client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => NatsWrapper._client.close());
    process.on("SIGTERM", () => NatsWrapper._client.close());

    new UserImageCreatedListener(NatsWrapper._client).listen();

    //Connect to DB
    await pool
      .connect({
        host: "user-photos-db-srv",
        port: dbConfig.dbPort,
        database: "postgres",
        user: "postgres",
        password: "postgres",
      })
      .then(() => {
        server = app().listen(6001, () => {
          console.log(`Server running on port  6001 `);
        });
      })
      .catch(err => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};
connectToNats();

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
