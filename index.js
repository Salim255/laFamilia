const app = require("./src/app.js");

const appConfig = require("./src/config/app");

const dbConfig = require("./src/config/db");

const pool = require("./src/config/pool");

pool
  .connect({
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    database: dbConfig.dbDatabase,
    user: dbConfig.dbUser,
    password: "",
  })
  .then(() => {
    app().listen(port, () => {
      console.log("====================================");
      console.log(`Server running on port ${port}`);
      console.log("====================================");
    });
  })
  .catch(err => {
    console.error(err);
  });
