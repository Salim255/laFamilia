const { Message } = require("node-nats-streaming");
const Listener = require("./listen");

class userImageCreatedListener extends Listener {
  subject = "user-image:created";
  queGroupName = "create-image-Queue-group";

  onMessage(data, msg = Message) {
    console.log("Event Data: ", data);
    msg.ack();
  }
}

module.exports = userImageCreatedListener;
