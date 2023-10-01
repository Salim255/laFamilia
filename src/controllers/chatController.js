const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

exports.createChat = async (req, res, next) => {
  try {
    const { chatType, usersId } = req.body;

    let createdChat;

    if (!isEmpty(chatType)) {
      const { rows } = await pool.query(`INSERT INTO chats (type) VALUES($1) RETURNING id, type;`, [
        chatType,
      ]);

      createdChat = rows[0];
    } else if (isEmpty(chatType)) {
      const { rows } = await pool.query(`INSERT INTO chats VALUES(DEFAULT) RETURNING id, type;`);
      createdChat = rows[0];
    }

    //Check if there users to start a new chat
    if (isEmpty(usersId)) {
      return res.status(401).json({
        status: "fail",
        message: "Chat needs to have at least two users",
      });
    }

    //Get all users
    const { rows: users } = await pool.query(`SELECT * FROM users`);

    //Check that all usersId still hold their account
    for (let i = 0; i < usersId.length; i++) {
      result = users.filter(element => element.id == usersId[i]);

      if (isEmpty(result)) {
        return res.status(401).json({
          status: "fails",
          message: "One user or more not exist any more",
        });
      }
    }

    req.body.createdChatId = createdChat.id;

    req.body.usersIdList = usersId;

    next();
  } catch (error) {
    res.send(error);
  }
};

exports.getChatUser = async (req, res) => {
  //Check if user already associated with the current chat id
  /*  const { rows: chatUser } = await pool.query(`SELECT * FROM chatUsers WHERE chat_id = $1;`, [
    createdChat.id,
  ]); */
  res.send("Hello from chatUser");
};
