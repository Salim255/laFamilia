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
let createCommentId;

describe("Comment on post test handler", () => {
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

  it("create comment on a post by user", async () => {
    await request(buildApp())
      .post(`/api/v1/posts/${createdPostId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then(async response => {
        createCommentId = response.body.data.id;
      });
  });

  it("update comment", async () => {});

  it("React to a post", async () => {
    await request(buildApp())
      .post(`/api/v1/posts/${createCommentId}/reactions`)
      .send({
        type: "comment",
        reaction: "like",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
  });

  it("delete comment", async () => {});
});
