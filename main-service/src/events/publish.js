class Publisher {
  subject = "user-image:created";
  client;
  //data = {};

  constructor(Stan) {
    this.client = Stan;
  }

  publish(data) {
    return new Promise((resolve, reject) => {
      this.client?.publish(this.subject, JSON.stringify(data), err => {
        if (err) {
          console.log("From publish error🧶");

          return reject(err);
        }

        console.log("====================================");
        console.log("Event published to subject: ✅", this.subject, data);
        console.log("====================================");

        resolve();
      });
    });
  }
}

module.exports = Publisher;
