const nats = require("node-nats-streaming");

console.clear();

const UserImageCreatedListener = require("../user-image-created-listener");
const stan = nats.connect("users", "12432", { url: "http:/localhost:4222" });

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  new UserImageCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
