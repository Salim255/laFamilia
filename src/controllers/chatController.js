const pool = require("../config/pool");

const isEmpty = require("../utils/isEmpty");

exports.createChat = async (req, res, next) => {
  try {
    const { chatType, usersId } = req.body;

    const { rows: users } = await pool.query(`SELECT * FROM users`);

    //1)Check if we have at least two users before creating a chat
    if (isEmpty(usersId) || usersId.length < 2) {
      return res.status(401).json({
        status: "fail",
        message: "Chat needs to have at least two users",
      });
    }

    //2)Check that all usersId still hold their account
    for (let i = 0; i < usersId.length; i++) {
      result = users.filter(element => element.id == usersId[i]);

      if (isEmpty(result)) {
        return res.status(401).json({
          status: "fails",
          message: "One user or more not exist any more",
        });
      }
    }

    //4)Create chat based on type

    let createdChat;

    //4-1)Create group chat
    if (!isEmpty(chatType)) {
      const { rows } = await pool.query(`INSERT INTO chats (type) VALUES($1) RETURNING id, type;`, [
        chatType,
      ]);

      createdChat = rows[0];
    } else if (isEmpty(chatType)) {
      //If chat of type dual, check if the two users already in chat or not

      const { rows: partnerPared } = await pool.query(
        `SELECT chats.* ,
        
         JSON_AGG(chatUsers.*) AS chatUsers
  
         FROM chats
  
         JOIN chatUsers On chats.id=chatUsers.chat_id
  
         JOIN users ON users.id=$1
  
         WHERE chats.type='dual' AND chatUsers.user_id=$2
  
         GROUP BY chats.id 
        
     `,
        [req.user.id, usersId[1]],
      );

      //If they are in chat, then return
      if (!isEmpty(partnerPared)) {
        return res.status(401).json({
          status: "fail",
          message: "You are already in chat with this user ",
        });
      }

      const { rows } = await pool.query(`INSERT INTO chats VALUES(DEFAULT) RETURNING id, type;`);
      createdChat = rows[0];
    }

    req.body.createdChatId = createdChat.id;

    req.body.usersIdList = usersId;

    next();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getChatsByUser = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT   chats.*,

      COALESCE(JSON_AGG(DISTINCT chatUsers.*) FILTER (WHERE chatUsers.user_id=$1)) AS chatUser,

      COALESCE(JSON_AGG( users.* ) FILTER (WHERE chatUsers.user_id!=$1))  AS users,

      JSON_AGG(messages.*)   AS messages

      FROM chats

      JOIN chatUsers ON chats.id = chatUsers.chat_id 

      JOIN users ON chatUsers.user_id = users.id

      JOIN messages ON messages.chat_id = chats.id

      GROUP BY chats.id

      ORDER BY chats.id ;
      
       `,
      [req.user.id],
    );

    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const { rows } = await pool.query(`DELETE FROM chats WHERE chats.id = $1`, [chatId]);

    res.status(204).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.send(error);
  }
};
