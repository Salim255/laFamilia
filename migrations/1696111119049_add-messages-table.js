/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    `
           CREATE TABLE  messages (
              id SERIAL PRIMARY KEY ,
    
              create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              type VARCHAR(25),
    
              content VARCHAR(255)  ,
              
              fromUserId INTEGER,
  
              chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE
                        );
          `,
  );
};

//User belongs to many chats
//User has many chatUser
exports.down = pgm => {
  pgm.sql(`       
      DROP TABLE  messages ;
            `);
};
