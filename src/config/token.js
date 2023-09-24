require("dotenv").config();

module.exports = {
  tokenJWT: process.env.JWT_SECRET,
  tokenEXP: process.env.WT_EXPIRATION,
};
