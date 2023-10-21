const request = require("supertest");

const buildApp = require("../../app");

const dbTestConfig = require("../../config/dbTst");

const userController = require("../../controllers/userController");

const pool = require("../../config/pool");

beforeAll(() => {
  return pool.connect({
    host: dbTestConfig.dbHost,
    port: dbTestConfig.dbPort,
    database: dbTestConfig.dbDatabase,
    user: dbTestConfig.dbUser,
    password: "",
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

let createdUserId;
let token;
describe("Chats test handler", () => {
  it("create  user 1", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "ok@gmail.com",
        password: "3333",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(async response => {
        createdUserId = response._body.data.user.id;
        token = response._body.data.token;
      });
  });

  it("create  user 2", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "ok@gmail.com",
        password: "3333",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(async response => {
        createdUserId = response._body.data.user.id;
        token = response._body.data.token;
      });
  });

  it("create a chat", async () => {
    await request(buildApp())
      .post(`/api/v1/chats`)
      .send({
        chatType: "group",
        usersId: [1, 2],
      })
      .expect(200)
      .then(async response => {
        createdUserId = response._body.data.user.id;
        token = response._body.data.token;
      });
    console.log("Hello chat test");
  });

  it("delete a user", async () => {
    await request(buildApp())
      .delete("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });
});
