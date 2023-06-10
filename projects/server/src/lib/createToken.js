const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  /**
   * 
   * @param {{ [key: string]: any }} payload 
   * @returns
   */
  createToken: (payload) => {
    // payload merupakan data-data yang ingin dibawa oleh token
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }); // parameter pertama payload, kedua secret key, dan ketiga expire time
  },
};
