const socketIo = require("socket.io");

const SocketServer = server => {
  const io = socketIo(server);

  io.on("connection", socket => {
    console.log("Connected");
    socket.on("join", async user => {
      console.log("New user joined", user);
    });
  });
};

module.exports = SocketServer;
