require("dotenv").config();

module.exports = {
  cookieJWT: process.env.JWT_SECRET,
  cookieEXP: process.env.JWT_COOKIE_EXPIRES_IN,
};
