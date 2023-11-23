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

INSERT INTO users(first_name, first_name, email)
VALUES("user", "pass", "z@gmail.com")