# Steps to run the application on K8s locally

- 1- run->: code /etc/hosts

- 2- add to file opened in step 1: lafamilia.dev + your pc id

- 3- run in the project file: skaffold dev

- 4- after step 3 you must see all the three service up and running.

- 5- If there are an error of connection of one or two of the services, please make a change to any file in side the service that dose'nt connected so skaffold will restart the service for the second time, and it should connect with success

- 6- from POSTMAN use : http://lafamilia.dev/api/v1/users/signup, with POST method to send a request to main-service, with body : {
  "first_name": "Name",
  "last_name": "Name",
  "email": "a@gmail.com",
  "password": "3333"

}

- 7- by sending the request in step 6, the main-service should print out -Event Published with user created data-, and the user-photo-service should print out -Message received:...-

- 8- if you see the messages in the step 7, then the test complete with success
