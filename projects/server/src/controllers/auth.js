require("dotenv/config");
const { models } = require("../models");
const { Users, Verification, Reset, Carts } = models;
const { createToken } = require("../lib/createToken");
const crypto = require("crypto");
const { hash, mailsend, randomStr } = require("../lib");

const sendVerify = (email, username, reset, token) => {
  mailsend.compose(
    reset ? "Reset Pass" : "Verify Account",
    email,
    `Hello ${username}, here's your ${reset ? "reset" : "verification"} link
    <br /><a href='${process.env.WHITELISTED_DOMAIN}/account/${reset ? "reset" : "verify"}/${token}'>Click Here</a> .
    `
  )
}

const AuthController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  registerUser: async (req, res) => {
    try {
      const { email, fullname, username, role = "User" } = req.body;
      const token = crypto.randomBytes(20).toString("hex");
      const password = randomStr();
      const profile_pic = `${req.protocol}://${req.headers.host}/default-avatar.png`;
      const user = await Users.create({
        fullname,
        username,
        email,
        role,
        isVerified: 0,
        password,
        profile_pic,
      });
      await Verification.create({
        token,
        user_id: user.id,
      });
      await Carts.create({ user_id: user.id });
      sendVerify(email, username, false, token);

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
      const { id, role, isVerified } = user;
      const token = createToken({ id, email, role, isVerified });
      return res.status(200).json({
        message: "Login Success",
        token,
        role: role.toLowerCase(),
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error?.errors[0] && (error?.errors[0]?.message || error.message),
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
      const Target =
        mode === "reset" ? Reset : mode === "verify" ? Verification : null;
      if (!Target)
        return res.status(422).json({ message: "Invalid Request URL" });
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
      if (!email)
        return res.status(422).json({ message: "E-mail is required" });
      const user = await Users.findOne({ where: { email } });
      if (!user)
        return res.status(404).json({ message: "E-mail not registered yet" });
      const token = randomStr(20);
      const reset = user.isVerified ? await Reset.create({ token, user_id: user.id }) : await Verification.create({ token, user_id: user.id });
      sendVerify(email, user.username, user.isVerified, token);

      return res.status(200).json({
        message: (user.isVerified ? "Verification" : "Reset") + " Link Sent",
        reset,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};

module.exports = AuthController;
