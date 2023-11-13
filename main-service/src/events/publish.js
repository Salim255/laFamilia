class Publisher {
  subject = "user-image:created";
  client;
  //data = {};

  constructor(Stan) {
    this.client = Stan;
  }

  publish(data) {
    return new Promise((resolve, reject) => {
      console.log("====================================");
      console.log(this.client, "Hellot from publis step🦺🦺", data);
      console.log("====================================");

      this.client?.publish(this.subject, JSON.stringify(data), err => {
        if (err) {
          console.log("====================================");
          console.log("Hello from publish errorrur🧶");
          console.log("====================================");
          return reject(err);
        }

        console.log("====================================");
        console.log("Event published to subject:", this.subject, data);
        console.log("====================================");

        resolve();
      });
    });
  }
}

module.exports = Publisher;
