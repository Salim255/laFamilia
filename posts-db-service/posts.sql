 CREATE TABLE  photos (
          id SERIAL PRIMARY KEY ,
  
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
         
  
          photo_url VARCHAR(255)  ,
  
          user_id INTEGER
          
 );