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
});
 */
beforeAll(() => {
  return pool.connect({
    host: "postgres",
    port: "5432",
    database: "laFamilia-test",
    user: "postgres",
    password: "postgres",
  });
});

afterAll(() => {
  return pool.close();
});

//After running all tests , disconnect from postgres

let createdUserId;
let token;
describe("Test user controller", () => {
  it("create a user", async () => {
    const startingCount = await userController.countUsers();

    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "nnnnnnnnbb@gmail.com",
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

  it("login a user", async () => {
    await request(buildApp())
      .post("/api/v1/users/login")
      .send({
        email: "nnnnnnnnbb@gmail.com",
        password: "3333",
      })
      .expect(200);
  });

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
