const { Message, Stan } = require("node-nats-streaming");
const Subjects = require("./subjects");
const pool = require("../config/pool");
class Listener {
  subject = Subjects.userImageCreated;
  data = "";
  queGroupName = "";
  msg = Message;
  onMessage(data, msg) {}
  //client = Stan;
  ackWait = 5 * 1000;

  constructor(client) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queGroupName);
  }

  parseMessage(msg) {
    const data = msg.getData();
    return typeof data === "string" ? JSON.parse(data) : JSON.parse(data.toString("utf8"));
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queGroupName,
      this.subscriptionOptions(),
    );
    subscription.on("message", msg => {
      console.log(`Message received: ${this.subject} / ${this.queGroupName}`, pool);
      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }
}

module.exports = Listener;
