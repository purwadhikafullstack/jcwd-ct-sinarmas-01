const { models } = require("../models");
const { Warehouses, Addresses, Users } = models;
const { searchGeo } = require("../controllers/address");
const { Op } = require("sequelize");

const warehouseController = {
  /**
   * Menambah warehouse baru ke database
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  addWarehouse: async function (req, res) {
    try {
      const { warehouse_name, q, username } = req.body;
      const [place] = await searchGeo(q);
      const admin = await Users.findOne({ where: { username } });
      if (admin.role !== "Admin") return res.status(400).json({ message: "This account isn't an admin" });
      const address = await Addresses.create({
        address_name: place.formatted,
        city: place.components?.city || place.components?.county.replace("Kabupaten ", ""),
        province: place.components.state,
        geolocation: q,
        type: place.components?.city ? "Kota" : "Kabupaten",
      });
      const warehouse = await Warehouses.create({ 
        warehouse_name, 
        address_id: address.id,
        user_id: admin.id || null
      });
      return res.status(201).json({ message: "Warehouse added", warehouse });
    } catch (error) {
      return res.status(500).json({
        message: error.response?.data?.errors[0]?.message || error.message
      });
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
      const { warehouse_name, q, address_id, username } = req.body;
      const admin = await Users.findOne({ where: { username } });
      if (admin.role !== "Admin") return res.status(400).json({ message: "This account isn't an admin" });
      const [place] = await searchGeo(q);
      const address = await Addresses.update({
          address_name: place.formatted,
          city: place.components?.city || place.components?.county.replace("Kabupaten ", ""),
          province: place.components.state,
          geolocation: q,
          type: place.components?.city ? "Kota" : "Kabupaten"
        },
        { where: { id: address_id } }
      );

      const warehouse = await Warehouses.findOne({ where: { id: warehouse_id } });
      warehouse.warehouse_name = warehouse_name;
      warehouse.user_id = (admin.id || null) || warehouse.user_id;
      await warehouse.save();
      return res.status(200).json({ message: "Warehouse edited", warehouse, address });
    } catch (error) {
      return res.status(500).json({ ...error });
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
      return res.status(500).json({ message: error.message });
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
      const wh = await Warehouses.findOne({ where: { user_id: req.user?.id } });
      const where = wh ? { [Op.not]: { id: wh.id } } : {};
      const query = page > 0 ? { limit: 5, offset } : { where, attributes: ["id", "warehouse_name"] };
      const warehouses = await Warehouses.findAndCountAll({ ...query, include: ['address', 'user'] });
      return res.status(200).json({
        message: "Fetch Success",
        ...warehouses,
        pages: Math.ceil(warehouses.count / 5)
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getWarehouse: async function (req, res) {
    try {
      const { user_id } = req.params;
      const warehouse = await Warehouses.findOne({
        where: { user_id },
        include: ["user"]
      });
      return res.status(200).json({ message: "Fetch Success", ...warehouse.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error : e });
    }
  }
};

module.exports = warehouseController;