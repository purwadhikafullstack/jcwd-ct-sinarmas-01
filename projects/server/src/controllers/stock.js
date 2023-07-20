const { models } = require("../models");
const { Warehouses, Stocks, StockJurnals, StockMutations } = models;
const { paginate } = require("../lib");

/**
 * 
 * @param {string | number} product_id 
 * @param {string | number} warehouse_id 
 * @param {number} stock 
 * @returns 
 */
async function newStock (product_id, warehouse_id, qty) {
  try {
    const stock = await Stocks.create({
      product_id, warehouse_id, stock: qty
    });
    await changeStock(stock.id, qty, 1);
    return stock;
  } catch (e) {
    throw e;
  }
}
async function requestStock (product_id, warehouse_id, stock) {
  try {

  } catch (e) {
    throw e;
  }
}
/**
 * 
 * @param {string | number} id 
 * @param {number} qty 
 * @param {string} remarks 
 * @returns 
 */
async function changeStock (id, qty, remark_id) {
  try {
    const stock = await Stocks.findByPk(id);
    if (!stock) return false;
    const stock_before = stock.stock;
    stock.stock = stock.stock + qty;
    await stock.save();
    const journal = await StockJurnals.create({
      remark_id,
      qty: Math.abs(qty),
      stock_before,
      stock_after: stock.stock,
      warehouse_id: stock.warehouse_id,
      stock_id: stock.id,
      tipe_jurnals_id: qty > 0 ? 1 : 2
    });
    return journal;
  } catch (e) {
    throw e;
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
    const user_id = req.user?.id;
    const where = req.user.role === "Super" ? { user_id } : {}
    const warehouse = await Warehouses.findOne({ where });
    const page = Number(req.query?.page || 1);
    const { limit, offset } = paginate(page);
    const wh = warehouse ? { warehouse_id: warehouse.id } : {};
    const stocks = await Stocks.findAndCountAll({ where: wh, limit, offset, include: ["warehouse", "product"] });
    const pages = Math.ceil(stocks.count / limit);
    return res.status(200).json({ message: "Fetch Success", ...stocks, page, pages });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

const stockController = {
  stocksInfo,
  changeStock,
  newStock,
  requestStock
};
module.exports = stockController;
module.exports.default = stockController;