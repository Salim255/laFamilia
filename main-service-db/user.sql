 CREATE TABLE  users (
        id SERIAL PRIMARY KEY ,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        first_name VARCHAR(30) ,
        last_name VARCHAR(30),
        photo VARCHAR( 255 )  ,
        email VARCHAR( 50 ) NOT NULL UNIQUE,
        password VARCHAR NOT NULL
        
);

CREATE TABLE  chats (
            id SERIAL PRIMARY KEY ,
  
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
            type VARCHAR(25) NOT NULL DEFAULT 'dual'  ,
            chat_name VARCHAR(25)
  
  );

CREATE TABLE  chatUsers (
        
                  id SERIAL PRIMARY KEY ,
        
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
                  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
                  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        
                  chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE
        
);

CREATE TABLE  messages (
              id SERIAL PRIMARY KEY ,
    
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
              type VARCHAR(25),
    
              content VARCHAR(255)  ,
              
              from_user_id INTEGER,
  
              chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE
                        );


 CREATE TABLE  posts (
          id SERIAL PRIMARY KEY ,
  
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

          captions VARCHAR(250) ,

          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
         
          
    );

CREATE TABLE  comments (
            id SERIAL PRIMARY KEY ,
    
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
            content TEXT ,
  
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

            post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE   
      );


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