// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
};
