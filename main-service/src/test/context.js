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
    // Randomly generating  a role name to connect to PG as
    const roleName = "a" + randomBytes(4).toString("hex");
    //We adding a because role name in postgres should start with letter not a number

    // Connect to PG as usual
    await pool.connect(DEFAULT_OPTS);

    // Create a new role, I stand for identifier and L stand for literal value
    await pool.query(format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName));

    console.log("====================================");
    console.log("Created  role and password 🦺🦺🦺", roleName);
    console.log("====================================");
    // Create a schema with the same name
    await pool.query(format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName));
    console.log("====================================");
    console.log("Created schema 🦺🦺🦺", roleName);
    console.log("====================================");
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

  async reset() {
    return pool.query(`
    DELETE FROM users;
    DELETE FROM chats;
    `);
  }
  async close() {
    // Disconnect from PG
    await pool.close();
    // Reconnect as our root user
    await pool.connect(DEFAULT_OPTS);

    // Delete the role and schema we created
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));

    await pool.query(format("DROP ROLE %I;", this.roleName));

    // Disconnect
    await pool.close();
  }
}

module.exports = Context;
