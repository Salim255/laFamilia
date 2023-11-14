const nats = require("node-nats-streaming");
const pool = require("./config/pool");
console.clear();
const UserImageCreatedListener = require("./events/user-image-created-listenr");
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
