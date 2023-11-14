const nats = require("node-nats-streaming");
const { Stan } = require("node-nats-streaming");

class NatsWrapper {
  _client;
  getClient() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._client;
  }
  connect(clusterId, clientId, url) {
    console.log("hello 🦺🦺");
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this._client?.on("connect", () => {
        console.log("====================================");
        console.log("Connected to NATS");

        console.log("====================================");

        resolve();
      });

      this._client?.on("error", err => {
        console.log("====================================");
        console.log(err, "hello from nats connection erro");
        console.log("====================================");
        reject(err);
      });
    });
  }
}
module.exports = new NatsWrapper();
