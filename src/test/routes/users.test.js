const request = require("supertest");

const buildApp = require("../../app");

const dbTestConfig = require("../../config/dbTst");

const userController = require("../../controllers/userController");

const pool = require("../../config/pool");

/* beforeAll(() => {
  return pool.connect({
    host: dbTestConfig.dbHost,
    port: dbTestConfig.dbPort,
    database: dbTestConfig.dbDatabase,
    user: dbTestConfig.dbUser,
    password: "",
  });
}); */

beforeAll(() => {
  return pool.connect({
    host: "postgres",
    port: "5432",
    database: "laFamilia-test",
    user: "postgres",
    password: "postgres",
  });
});

//After running all tests , disconnect from postgres
afterAll(() => {
  return pool.close();
});

it("create a user", async () => {
  const startingCount = await userController.countUsers();

  await request(buildApp())
    .post("/api/v1/users/signup")
    .send({
      first_name: "salim",
      last_name: "hassan",
      email: "s@gmail.com",
      password: "3333",
    })
    .expect(200);

  const finishCount = await userController.countUsers();

  expect(finishCount - startingCount).toEqual(1);
});
