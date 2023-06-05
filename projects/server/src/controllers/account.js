require("dotenv/config");
const { models } = require("../models");
const { Users } = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accountController = {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  register: async function (req, res) {},
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) return res.status(422).json({ message: "Login Failed" });
      const token = await jwt.sign(
        { user_id: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ message: "Login Success", token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  allUsers: async function (req, res) {
    try {
      const { page } = req.query;
      const user = await Users.findAndCountAll({ limit:5, offset: (page-1) * 5 });
      return res.status(200).json({ message: "Fetch Success", ...user });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

module.exports = accountController;
