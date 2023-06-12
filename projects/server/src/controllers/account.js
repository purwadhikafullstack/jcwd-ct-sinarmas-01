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
      const { page, role = "" } = req.query;
      const where = role ? ({ where: { role: capitalize(role) } }) : {};
      const offset = (page > 0) ? (Number(page)-1) * 5 : 0;
      const user = await Users.findAndCountAll({ limit:5, offset, ...where });
      return res.status(200).json({ message: "Fetch Success", ...user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = accountController;
