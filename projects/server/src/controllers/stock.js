const { models } = require("../models");
const { Warehouses, Stocks } = models;

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
async function newStock (req, res) {
  try {
    
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}
async function requestStock (req, res) {
  try {

  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}
/**
 * Get Warehouse Stock Info
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
async function stocksInfo (req, res) {
  try {
    const user_id = req.user.id;
    const warehouse = await Warehouses.findOne({ where: { user_id } });
    const stocks = await Stocks.findAndCountAll({ where: { warehouse_id: warehouse.id } });
    return res.status(200).json({ message: "Fetch Success", ...stocks });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

const stockController = {
  stocksInfo
};
module.exports = stockController;
module.exports.default = stockController;