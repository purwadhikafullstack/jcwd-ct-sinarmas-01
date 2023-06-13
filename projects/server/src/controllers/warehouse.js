const { models } = require("../models");
const { Warehouses, Addresses } = models;

const warehouseController = {
  /**
   * Menambah warehouse baru ke database
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  addWarehouse: async function (req, res) {
    try {
      const { warehouse_name, address_id, user_id } = req.body;
      // const { user_id } = req.user;
      const warehouse = await Warehouses.create({ warehouse_name, address_id, user_id });
      return res.status(201).json({ message: "Warehouse added", warehouse });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  editWarehouse: async function (req, res) {
    try {
      const { warehouse_id } = req.params;
      const { warehouse_name, address_id } = req.body;
      const warehouse = await Warehouses.findOne({ where: { id: warehouse_id } });
      warehouse.warehouse_name = warehouse_name;
      warehouse.address_id = address_id;
      await warehouse.save();
      return res.status(200).json({ message: "Warehouse edited", warehouse });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * Menghapus warehouse
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  removeWarehouse: async function (req, res) {
    try {
      const { warehouse_id } = req.params;
      const warehouse = await Warehouses.destroy({ where: { id: warehouse_id } });
      return res.status(200).json({ message: "Warehouse deleted", warehouse });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * Mendisplay warehouse yang terdaftar dalam database
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  warehouseList: async function (req, res) {
    try {
      const page = Number(req.query.page);
      const offset = (page > 0) ? ((page-1) * 5) : 0;
      const warehouses = await Warehouses.findAndCountAll({ limit: 5, offset, include: ['address', 'user'] });
      return res.status(200).json(warehouses);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

module.exports = warehouseController;