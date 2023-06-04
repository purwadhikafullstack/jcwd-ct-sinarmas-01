const { models } = require("../models");
const { Warehouses } = models;

const warehouseController = {
  /**
   * Menambah warehouse baru ke database
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  addWarehouse: async function (req, res) {
    try {
      const { warehouse_name, address_id } = req.body;
      const { user_id } = req.user;
      const warehouse = await Warehouses.create({ warehouse_name, address_id, user_id });
      return res.status(201).json({ message: "Warehouse added", warehouse });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = warehouseController;