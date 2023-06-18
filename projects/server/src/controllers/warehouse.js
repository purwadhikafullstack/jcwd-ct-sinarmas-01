const { models } = require("../models");
const { Warehouses, Addresses } = models;
const { searchGeo } = require("../controllers/address");

const warehouseController = {
  /**
   * Menambah warehouse baru ke database
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  addWarehouse: async function (req, res) {
    try {
      const { warehouse_name, q } = req.body;
      const [place] = await searchGeo(q);
      const address = await Addresses.create({
        address_name: place.formatted,
        city: place.components?.city || place.components?.county,
        province: place.components.state,
        geolocation: q,
      });
      console.log(address.id);
      const warehouse = await Warehouses.create({ warehouse_name, address_id: address.id });
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
      const { warehouse_name, q, address_id } = req.body;
      const [place] = await searchGeo(q);
      const address = await Addresses.update({
          address_name: place.formatted,
          city: place.components?.city || place.components?.county,
          province: place.components.state,
          geolocation: q,
        },
        { where: { id: address_id } }
      );

      const warehouse = await Warehouses.findOne({ where: { id: warehouse_id } });
      warehouse.warehouse_name = warehouse_name;
      warehouse.address_id = address.id;
      await warehouse.save();
      return res.status(200).json({ message: "Warehouse edited", warehouse });
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
      const warehouses = await Warehouses.findAndCountAll({ limit: 5, offset, include: ['address', 'user'] });
      return res.status(200).json({
        message: "Fetch Success",
        ...warehouses,
        pages: Math.ceil(warehouses.count / 5)
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = warehouseController;