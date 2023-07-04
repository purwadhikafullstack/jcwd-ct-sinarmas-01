require("dotenv/config");
const { models } = require("../models");
const { Users } = models;
const capitalize = require("../lib/capitalize");

const accountController = {
  /**
   * Mendapatkan data semua user
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  allUsers: async function (req, res) {
    try {
      const { page = 1, role = "" } = req.query;
      const where = role ? ({ where: { role: capitalize(role) } }) : {};
      const offset = (page > 0) ? (Number(page)-1) * 5 : 0;
      const user = await Users.findAndCountAll({ limit:5, offset, ...where });
      const pages = Math.ceil(user.count / 5);
      return res.status(200).json({ message: "Fetch Success", ...user, pages });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getRole: async function (req, res) {
    try {
      const { user } = req;
      const role = user.role || null;
      return res.status(200).json({ message: `The role is ${role}`, role: role.toLowerCase() });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  /**
   * Mendapatkan detail user
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  userDetail: async function (req, res) {
    try {
      const { email } = req.params;
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Account not found" });
      return res.status(200).json({ message: "Fetch Success", ...user.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  }
};

module.exports = accountController;
