const nats = require("node-nats-streaming");
const { randomBytes } = require("crypto");
const userImageCreatedListener = require("./events/user-image-created-listenr");
console.clear();
//Client to connect to our nats streaming server
const stan = nats.connect("users", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("====================================");
  console.log("Listener connected to NATS");
  console.log("====================================");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  //The option setManualAckMode(true) allow us to retreat received event in case something went wrong during saving data in DB for example
  /*   const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("orders-service-Queue-group"); */

  //this is the object that we're going to listen to and we're going to receive some data through the subscription
  //const subscription = stan.subscribe("user-image:created", "gueue-group-name", options);

  /*  subscription.on("message", msg => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Message received: user-image:created/main-app-service, `);
      console.log("====================================");
      console.log(`Event data: ${data}`);
      console.log("====================================");
    }
    //To inform NATS that we well received the event,then process ended
    msg.ack();
  }); */
  //await new Listener.listen();
  new userImageCreatedListener(stan).listen();
});

//Intercept terminate or interrupt request to our program, then we close the client gracefully, then the client will not receive event while it's closing
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
