const { models } = require("../models");
const { Users, Warehouses, Verification } = models;
const crypto = require("crypto");
const { mailsend } = require("../lib");

const adminController = {
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
      await Verification.destroy({ where: { user_id } });
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