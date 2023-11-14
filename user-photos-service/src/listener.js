const nats = require("node-nats-streaming");
const { randomBytes } = require("crypto");

//const userImageCreatedListener = require("./events/user-image-created-listenr");

console.clear();

console.log("Hello world");
//Client to connect to our nats streaming server
const stan = nats.connect("users", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new userImageCreatedListener(stan).listen();
});

//Intercept terminate or interrupt request to our program, then we close the client gracefully, then the client will not receive event while it's closing
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
