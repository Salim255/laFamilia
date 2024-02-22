const { Message } = require("node-nats-streaming");
const Listener = require("./listen");
const photoController = require("../controllers/user-photos-controller");

class UserImageCreatedListener extends Listener {
  subject = "user-image:created";
  queGroupName = "create-image-Queue-group";

  async onMessage(data, msg = Message) {
    const { id: userId, photo: photo_url } = data;

    const result = await photoController.createUserPhoto({ userId, photo_url });

    console.log("From user image created:✅ ", result);
    msg.ack();
  }
}

module.exports = UserImageCreatedListener;
