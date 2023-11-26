/* eslint-disable camelcase */

exports.shorthands = undefined;
exports.up = pgm => {
  pgm.sql(
    `
         CREATE TABLE  chats (
            id SERIAL PRIMARY KEY ,
  
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
            type VARCHAR(25) NOT NULL DEFAULT 'dual'  ,
            chat_name VARCHAR(25)
  
  
                      );
        `,
  );
};

//Chat belong to many users through chatUser
//Chat has many of chatUser
exports.down = pgm => {
  pgm.sql(`  
    DROP TABLE  chats;
          `);
};
