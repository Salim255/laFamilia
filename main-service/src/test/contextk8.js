const pool = require("../config/pool");

const { randomBytes } = require("crypto");

const { default: migrate } = require("node-pg-migrate");

const format = require("pg-format");

const dbTestConfig = require("../config/dbTst");
const { Pool } = require("pg");
/* const DEFAULT_OPTS = {
  host: dbTestConfig.dbHost,
  port: dbTestConfig.dbPort,
  database: dbTestConfig.dbDatabase,
  user: dbTestConfig.dbUser,
  password: "",
}; */

const DEFAULT_OPTS = {
  host: "postgres",
  port: "5432",
  database: "laFamilia-test",
  user: "postgres",
  password: "postgres",
};

class Context {
  static async build() {
    // Connect to PG as usual
    await pool.connect(DEFAULT_OPTS);

    // Disconnect entirely from PG
    await pool.close();

    // Run our migration programmatically in the new schema
    await migrate({
      schema: roleName,

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
        host: "postgres",
        port: dbTestConfig.dbPort,
        database: dbTestConfig.dbDatabase,
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role
    /*   await pool.connect({
      host: dbTestConfig.dbHost,

      port: dbTestConfig.dbPort,

      database: dbTestConfig.dbDatabase,

      user: roleName,

      password: roleName,
    }); */
    await pool.connect({
      host: "postgres",

      port: dbTestConfig.dbPort,

      database: dbTestConfig.dbDatabase,

      user: roleName,

      password: roleName,
    });
    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async close() {
    // Disconnect
    await pool.close();
  }
}

module.exports = Context;
