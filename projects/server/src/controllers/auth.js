const { models } = require("../models");
const { Users, Verification } = models;
require("dotenv").config();
const transporter = require("../lib/sendemail");
const { createToken } = require("../lib/createToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const AuthController = {
  registerUser: async (req, res) => {
    try {
      const { email, fullname, username } = req.body;
      const token = crypto.randomBytes(20).toString('hex');
      const user = await Users.create({
        fullname,
        username,
        email,
        role: "User",
        isVerified: 0,
        password: crypto.randomBytes(8).toString('hex'),
      });
      await Verification.create({
        token,
        user_id: user.id
      });
      transporter.sendMail({
        from: `Admin Multi Warehouse <${process.env.EMAIL_USER}>`,
        to: `${email}`,
        subject: "Activate account",
        html: `<h1>Welcome to Multi-Warehouse E-Commerce. Hello ${username}, please confirm your account <a href='${process.env.WHITELISTED_DOMAIN}/authentication/${token}'>here</a></h1>`,
      });

      return res.status(200).json({
        message: "Register Success!",
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err?.errors[0]?.message || err.message,
      });
    }
  },
  /**
   * Login ke Akun yang tersedia
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      console.log(user);
      if (!user) return res.status(422).json({ message: "User not registered" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(409).json({ message: "Wrong Password" });
      const { id, role } = user;
      const token = createToken({ id, email, role });
      return res.status(200).json({
        message: "Login Success",
        token,
        role: role.toLowerCase()
      })
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error?.errors[0]?.message || error.message
      });
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns 
   */
  setPassword: async function (req, res) {
    try {
      const { verify_token } = req.params;
      const { password } = req.body;
      const user = await Users.findOne({ where: { verify_token } });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user.password = hashed;
      user.verify_token = "";
      await user.save();
      return res.status(200).json({ message: "Set password success" });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message
      });
    }
  }
};

module.exports = AuthController;
