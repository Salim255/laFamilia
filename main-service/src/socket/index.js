const socketIo = require("socket.io");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

const pool = require("../config/pool");

const users = new Map();

const SocketServer = server => {
  const io = socketIo(server);

  io.on("connection", socket => {
    console.log("Connected");
    socket.on("join", async user => {
      let sockets = [];
      if (users.has(user.user_id)) {
        const existingUser = users.get(user_id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);

        sockets = [...existingUser.sockets, ...[socket.id]];
      } else {
        users.set(user.user_id, { id: user.user_id, sockets: [socket.id] });
        sockets.push(socket.id);
      }

      //Track all online friends

      const onlineFriends = []; //ids
      const chatters = []; //query
      getChatters(1);
      //Notify friends that, this user is online
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i]);
          chatters.socket.foreach(socket => {
            try {
              //The a message to the socket that have this id
              io.to(socket.id).emit("online", user);
            } catch (error) {}
          });
          //Add user to online friends list
          onlineFriends.push(chatter.id);
        }
      }

      //Send to user himself to tell which of his friends are online
      sockets.forEach(socket => {
        try {
          //The a message to the socket that have this id
          io.to(socket).emit("friends", onlineFriends);
        } catch (error) {}
      });
      //console.log("New user joined", user);
      //io.to(socket.id).emit("typing", "User typing...");
    });

    /*    socket.on("message", async user => {
      console.log("New message sent", user);
    });

    socket.on("typing", async user => {
      console.log("User typing", user);
    }); */
  });
};

const getChatters = async userID => {
  try {
    console.log("====================================");
    console.log("Hello Salim   ", userID);
    console.log("====================================");
    const { rows } = await pool.query(`SELECT * FROM users, RETURNING *`, [userID]);
    console.log("====================================");
    console.log(rows[0]);
    console.log("====================================");
  } catch (error) {}
};
module.exports = SocketServer;
