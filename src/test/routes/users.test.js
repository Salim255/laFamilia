const request = require("supertest");

const buildApp = require("../../app");

const dbTestConfig = require("../../config/dbTst");

const userController = require("../../controllers/userController");

const pool = require("../../config/pool");

const { randomBytes } = require("crypto");

const { default: migrate } = require("node-pg-migrate");

const format = require("pg-format");

beforeAll(async () => {
  // Randomly generating  a role name to connect to PG as
  const roleName = "a" + randomBytes(4).toString("hex");
  //We adding a because role name in postgres should start with letter not a number

  // Connect to PG as usual
  await pool.connect({
    host: dbTestConfig.dbHost,
    port: dbTestConfig.dbPort,
    database: dbTestConfig.dbDatabase,
    user: dbTestConfig.dbUser,
    password: "",
  });

  // Create a new role
  await pool.query(`
  CREATE ROLE ${roleName} WITH LOGIN PASSWORD '${roleName}'`);

  // Create a schema with the same name
  await pool.query(`
      CREATE SCHEMA ${roleName} AUTHORIZATION ${roleName}`);

  // Disconnect entirely from PG
  await pool.close();

  // Run our migration programmatically in the new schema
  await migrate({
    schema: roleName,
    direction: "up",
    log: () => {}, //By passing empty function to log, there will be no logs to the console
    noLock: true, //By default we should run one migration at the time, we ride that by passing noLock =true, so we can run as many migration we want
    dir: "migrations", //File where our migrations files stored
    databaseUrl: {
      host: dbTestConfig.dbHost,
      port: dbTestConfig.dbPort,
      database: dbTestConfig.dbDatabase,
      user: roleName,
      password: roleName,
    },
  });

  // Connect to PG as the newly created role
  await pool.connect({
    host: dbTestConfig.dbHost,
    port: dbTestConfig.dbPort,
    database: dbTestConfig.dbDatabase,
    user: roleName,
    password: roleName,
  });
});

/* beforeAll(() => {
  return pool.connect({
    host: "postgres",
    port: "5432",
    database: "laFamilia-test",
    user: "postgres",
    password: "postgres",
  });
}); */

afterAll(() => {
  return pool.close();
});

//After running all tests , disconnect from postgres

let createdUserId;
let token;
describe("Test user controller", () => {
  //Create user test
  it("create a user", async () => {
    const startingCount = await userController.countUsers();
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "nnnnnnnnbbbbb@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(async response => {
        createdUserId = response._body.data.user.id;
        token = response._body.data.token;
      });

    const finishCount = await userController.countUsers();

    expect(finishCount - startingCount).toEqual(1);
  });

  //Login user test
  it("login a user", async () => {
    await request(buildApp())
      .post("/api/v1/users/login")
      .send({
        email: "nnnnnnnnbbbbb@gmail.com",
        password: "3333",
      })
      .expect(200);
  });

  //Update user test
  it("update user", async () => {
    await request(buildApp())
      .put("/api/v1/users")
      .send({
        first_name: "dddd",
        last_name: "mmm",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  //Get all user test
  it("get all users", async () => {
    await request(buildApp())
      .get("/api/v1/users/")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  //Delete user test
  it("delete a user", async () => {
    const startingCount = await userController.countUsers();
    await request(buildApp())
      .delete("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const finishCount = await userController.countUsers();

    expect(finishCount - startingCount).toEqual(-1);
  });
});
