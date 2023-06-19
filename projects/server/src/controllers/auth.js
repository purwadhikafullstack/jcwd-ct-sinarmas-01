const { models } = require("../models");
const { Users, Verification, Reset } = models;
require("dotenv").config();
const { createToken } = require("../lib/createToken");
const crypto = require("crypto");
const { hash, mailsend, randomStr } = require("../lib");

const AuthController = {
  registerUser: async (req, res) => {
    try {
      const { email, fullname, username } = req.body;
      const token = crypto.randomBytes(20).toString("hex");
      const password = randomStr();
      const user = await Users.create({
        fullname,
        username,
        email,
        role: "User",
        isVerified: 0,
        password,
      });
      await Verification.create({
        token,
        user_id: user.id,
      });
      mailsend.compose(
        "Verification",
        email,
        `
        <h1>Welcome to Multi-Warehouse E-Commerce. Hello ${username}, please confirm your account 
        <a href='${process.env.WHITELISTED_DOMAIN}/account/verify/${token}'>here</a>
        </h1>
        `
      );

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
      if (!user)
        return res.status(422).json({ message: "User not registered" });
      const match = await hash.verify(password, user.password);
      if (!match) return res.status(409).json({ message: "Wrong Password" });
      const { id, role } = user;
      const token = createToken({ id, email, role });
      return res.status(200).json({
        message: "Login Success",
        token,
        role: role.toLowerCase(),
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error?.errors[0]?.message || error.message,
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
      const { mode, token } = req.params;
      const { password } = req.body;
      const Target = mode === "reset" ? Reset : (mode === "verify" ? Verification : null);
      if (!Target) return res.status(422).json({ message: "Invalid Request URL" });
      const result = await Target.findOne({
        where: { token },
      });
      const user = await Users.findOne({ where: { id: result.user_id } });
      if (!user) return res.status(404).json({ message: "User not found" });
      const hashed = await hash.encrypt(password);
      user.password = hashed;
      user.isVerified = 1;
      await user.save();
      await Target.destroy({ where: { user_id: user.id } });
      return res.status(200).json({ message: "Password Changed Successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  requestReset: async function (req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(422).json({ message: "E-mail is required" });
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "E-mail not registered yet" });
      const token = randomStr(20);
      const reset = await Reset.create({
        token,
        user_id: user.id,
      });
      mailsend.compose("Password Reset", email, `
        <h1>Hello, ${email}. Here is your reset code<br/>
        <a href="${process.env.WHITELISTED_DOMAIN}/account/reset/${token}">Reset Password</a>
        </h1>
      `);

      return res.status(200).json({
        message: "Reset Link Sent",
        reset
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};

module.exports = AuthController;
