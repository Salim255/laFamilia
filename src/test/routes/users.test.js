const request = require("supertest");

const dbConfig = require("../../config/db");

const buildApp = require("../../app");

const userController = require("../../controllers/userController");

const pool = require("../../config/pool");

beforeAll(() => {
  return pool.connect({
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    database: dbConfig.dbDatabase,
    user: dbConfig.dbUser,
    password: "",
  });
});

//After running all tests , disconnect from postgres
afterAll(() => {
  return pool.close();
});

it("create a user", async () => {
  const startingCount = await userController.countUsers();

  expect(startingCount).toEqual(0);

  await request(buildApp())
    .post("/users")
    .send({
      first_name: "salim",
      last_name: "hassan",
      email: "asq@gmail.com",
      password: "3333",
    })
    .expect(200);

  const finishCount = await userController.countUsers();

  expect(finishCount).toEqual(1);
});
