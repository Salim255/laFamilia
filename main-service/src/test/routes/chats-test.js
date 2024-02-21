const request = require("supertest");

const buildApp = require("../../app");

const chatController = require("../../controllers/chatController");

const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

afterAll(() => {
  return context.close();
});

let partnerId;
let token;

describe("Chats test handler", () => {
  it("create  user 1", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "a@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(response => {
        token = response._body.data.token;
      });
  });

  it("create  user 2", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "b@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(response => {
        partnerId = response._body.data.id;
      });
  });

  it("create a chat", async () => {
    const startingCount = await chatController.countChats();

    await request(buildApp())
      .post(`/api/v1/chats`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        chatType: "group",
        partnerId: partnerId,
      })
      .expect(200);

    const finishingCount = await chatController.countChats();

    expect(finishingCount - startingCount).toEqual(1);
  });

  it("get chats by user", async () => {
    await request(buildApp())
      .get(`/api/v1/chats`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("get chatsUser by user", async () => {
    await request(buildApp())
      .get(`/api/v1/chatUsers`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("delete chatUser by user and chatUser id", async () => {
    await request(buildApp())
      .delete(`/api/v1/chats/1/chatUsers/1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("Delete chats by user", async () => {
    const startingCount = await chatController.countChats();

    await request(buildApp())
      .delete(`/api/v1/chats/1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const finishingCount = await chatController.countChats();

    expect(finishingCount - startingCount).toEqual(-1);
  });
});
