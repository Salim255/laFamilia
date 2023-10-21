const request = require("supertest");

const buildApp = require("../../app");

const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

afterAll(() => {
  return context.close();
});

let createdUserId;
let token;
let createdPostId;

describe("Posts test handler", () => {
  it("create a user account", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "s@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(async response => {
        createdUserId = response._body.data.user.id;
        token = response._body.data.token;
      });
  });

  it("create post", async () => {
    await request(buildApp())
      .post(`/api/v1/posts/`)
      .send({
        captions: "Hello Salim",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then(async response => {
        createdPostId = response._body.data.id;
      });
  });

  it("update post", async () => {
    await request(buildApp())
      .put(`/api/v1/posts/${createdPostId}`)
      .send({
        captions: "Hello Salim",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
  });

  it("get all post by user", async () => {
    await request(buildApp())
      .get(`/api/v1/posts`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("React to a post", async () => {
    await request(buildApp())
      .post(`/api/v1/posts/${createdPostId}/reactions`)
      .send({
        type: "post",
        reaction: "like",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
  });

  it("delete post by user", async () => {
    await request(buildApp())
      .delete(`/api/v1/posts/${createdPostId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });
});
