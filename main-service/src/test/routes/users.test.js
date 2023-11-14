const request = require("supertest");

const buildApp = require("../../app");

const userController = require("../../controllers/userController");

const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

afterAll(() => {
  return context.close();
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
        email: "a@gmail.com",
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
        email: "a@gmail.com",
        password: "3333",
      })
      .expect(200);
  });

  //Update user test
  it("update user", async () => {
    await request(buildApp())
      .put("/api/v1/users")
      .send({
        first_name: "Salim",
        last_name: "Hassan",
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
