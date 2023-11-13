const { Message } = require("node-nats-streaming");
const Listener = require("./listen");
const photoController = require("../controllers/user-photos-controller");
class userImageCreatedListener extends Listener {
  subject = "user-image:created";
  queGroupName = "create-image-Queue-group";

  async onMessage(data, msg = Message) {
    console.log("Event Data: ", data);
    const { id: userId, photo: photo_url } = data;
    /*     INSERT INTO users (first_name, last_name, email, password)
    VALUES 
       ($1, $2, $3, $4) RETURNING id, created_at,updated_at, first_name,photo,email ; */
    /*  const { rows } = await pool.query(
      `INSERT INTO photos (photo_url ,user_id )
    VALUES($1, $2) RETURNING *; 
    `,
      [photo_url, userId],
    ); */
    const result = await photoController.createUserPhoto({ userId, photo_url });
    console.log(result);
    msg.ack();
  }
}

module.exports = userImageCreatedListener;
