/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    `
           CREATE TABLE  reactions (
              id SERIAL PRIMARY KEY ,
    
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              type VARCHAR(25) NOT NULL  ,

              reaction VARCHAR(25) NOT NULL  ,

              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ,

              post_id INTEGER  REFERENCES posts(id) ON DELETE CASCADE,

              comment_id INTEGER  REFERENCES comments(id) ON DELETE CASCADE,

              message_id INTEGER  REFERENCES messages(id) ON DELETE CASCADE

    
                        );
          `,
  );
};

exports.down = pgm => {
  pgm.sql(`
      DROP TABLE reactions;
            `);
};
