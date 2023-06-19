const { models } = require("../models");
const { Users, Warehouses } = models;
const transporter = require("../lib/transporter");
const crypto = require("crypto");

const adminController = {
  /**
   * Menambah user baru dari halaman admin
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  addUser: async function (req, res) {
    try {
      const { email, username, fullname } = req.body;
      const password = crypto.randomBytes(8).toString('hex');
      const user = await Users.create({ email, password, username, fullname, role: "Admin" });
      transporter.sendMail({
        subject: "Admin Verification",
        from: process.env.EMAIL_USER,
        to: email,
        html: `
          <h1>Hello, ${username}. Please verify your account to use this app and set your password <br>
          <a href="http://${process.env.WHITELISTED_DOMAIN}/#/auth/verify">Verify Me</a>
        `
      }).catch(err => {
        if (err) console.log(err);
      }) ;
      return res.status(201).json({ message: "User added", user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  /**
   * Admin mengubah data user
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  editUser: async function (req, res) {
    try {
      const { user_id } = req.params;
      const { email, username } = req.body;
      const user = await Users.findOne({ where: { id: user_id } });
      user.email = email;
      user.username = username;
      await user.save();
      console.log(user);
      return res.status(200).json({ message: "User Edited successfully", user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * Menghapus user
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  removeUser: async function (req, res) {
    try {
      const { user_id } = req.params;
      const user = await Users.destroy({ where: { id: user_id }});
      return res.status(200).json({ message: "Delete Success", user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * Menambah gudang baru
   * @param {import("exprses").Request} req
   * @param {import("express").Response} res
   */
  newWarehouse: async function (req, res) {
    try {
      const { address_id, warehouse_name, user_id } = req.body;
      const warehouse = await Warehouses.create({ warehouse_name, address_id, user_id });
      return res.status(201).json({ message: "Warehouses Added", warehouse });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = adminController;