const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createToken: (payload) => {
    // payload merupakan data-data yang ingin dibawa oleh token
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }); // parameter pertama payload, kedua secret key, dan ketiga expire time
  },
};
