const { models } = require("../../models");
const { Users } = models;
require("dotenv").config();
const transporter = require("../lib/sendemail");
const { createToken } = require("../lib/createToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthController = {
  registerUser: async (req, res) => {
    try {
      const { email, fullname, username } = req.body;
      //check email
      const isEmailExist = await Users.findOne({
        where: { email },
      });
      const isUsernameExist = await Users.findOne({
        where: { username },
      });
      if (isEmailExist) {
        return res.status(409).json({
          message: "Email already exist!",
        });
      } else if (isUsernameExist) {
        return res.status(409).json({
          message: "Username already exist!",
        });
      }
      //

      let token = createToken({
        username,
        email,
        role: "user",
        isVerified: 0,
      }); // memasukan bahan data ke createToken untuk menjadi payloadnya
      await Users.create({
        fullname,
        username,
        email,
        role: "user",
        isVerified: 0,
        verify_token: token,
      });
      await transporter.sendMail(
        {
          from: `Admin Multi Warehouse <${process.env.EMAIL_USER}>`,
          to: `${email}`,
          subject: "Activate account",
          html: `<h1>Welcome to Multi-Warehouse E-Commerce. Hello ${email}, please confirm your account <a href='http://localhost:3000/authentication/${token}'>here</a></h1>`,
        },
        (errMail, resMail) => {
          if (errMail) {
            console.log(errMail);
            res.status(500).send({
              message: "Verification Failed!",
              success: false,
              err: errMail,
            });
          }
          res.status(200).send({
            message: "Verification Success",
            success: true,
          });
        }
      );
      const user = await Users.findOne({
        where: { email },
      });

      return res.status(200).json({
        token,
        message: "Register Success!",
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  verification: async (req, res) => {
    let token = req.headers.authorization; // token yang sudah diambil melalui request headers authorizationnya
    try {
      token = token.split(" ")[1]; // displit lalu diambil index ke 1 yakni tokennya doang
      const user = await Users.findOne({ where: { email: req.user.email } });
      if (user.verify_token === null) {
        return res.status(409).send({ message: "Token Invalid" });
      } else if (token !== user.verify_token) {
        return res.status(409).send({ message: "Token Invalid" });
      }
      return res
        .status(200)
        .send({ message: "Verified Account", success: true });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  setPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const user = await Users.findOne({ where: { email: req.user.email } });
      function validatePassword(password) {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
      }
      if (!validatePassword(password)) {
        return res.status(409).json({
          message:
            "Password setidaknya terdiri dari huruf besar, simbol, angka, dan minimum 8 karakter",
        });
      }
      if (password !== confirmPassword) {
        return res.status(409).json({
          message: "Password harus sama",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await Users.update(
        { password: hashPassword, isVerified: 1, verify_token: null },
        { where: { email: req.user.email } }
      );
      return res
        .status(200)
        .send({ message: "Berhasil Menambahkan Password!" });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = AuthController;
