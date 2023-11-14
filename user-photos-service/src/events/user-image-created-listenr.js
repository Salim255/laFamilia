const { Message } = require("node-nats-streaming");
const Listener = require("./listen");
const photoController = require("../controllers/user-photos-controller");
const pool = require("../config/pool");

class UserImageCreatedListener extends Listener {
  subject = "user-image:created";
  queGroupName = "create-image-Queue-group";

  async onMessage(data, msg = Message) {
    console.log("Event Data helloo:  ", data, pool);
    if (pool) {
      const { id: userId, photo: photo_url } = data;

      //const result = await photoController.createUserPhoto({ userId, photo_url });

      msg.ack();
    }
  }
}

module.exports = UserImageCreatedListener;
