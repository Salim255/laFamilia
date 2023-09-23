require("dotenv").config();

module.exports = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbDatabase: process.env.DB_DATABASE,
  dbUser: process.env.DB_USER,
  dbPassword: "",
};
