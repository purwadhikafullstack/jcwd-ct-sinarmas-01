const { models } = require("../models");
const { Warehouses, Stocks, StockJurnals, StockMutations } = models;
const { paginate } = require("../lib");
const { Op } = require("sequelize");

/**
 * 
 * @param {string | number} product_id 
 * @param {string | number} warehouse_id 
 * @param {number} stock 
 * @returns 
 */
async function newStock (product_id, warehouse_id, qty) {
  try {
    await Stocks.create({
      product_id, warehouse_id, stock: qty
    });
    const stock = await Stocks.findOne({ where: { product_id, warehouse_id } });
    await changeStock(stock.id, qty, 1);
    return stock;
  } catch (e) {
    throw e;
  }
}
async function changeRequestStatus (id, acc) {
  try {
    const mutation = await StockMutations.findByPk(id, { include: ["stock"] });
    const friend = await Stocks.findOne({ 
      where: { 
        product_id: mutation.stock?.product_id,
        stock: {
          [Op.gte]: mutation.qty
        }
      },
    });
    if (!friend) return res.status(422).json({ message: "All warehouses don't have the requested product" })
    mutation.approved = !!acc;
    await mutation.save();
    if (acc) {
      await changeStock(mutation.stock.id, mutation.qty, 1);
      await changeStock(friend.id, mutation.qty, 3);
    } 
    return mutation;
  } catch (e) {
    throw e;
  }
}
async function getStock (product_id, warehouse_id) {
  try {
    const stock = await Stocks.findOne({ where: { product_id, warehouse_id } });
    return stock || null;
  } catch (e) {
    throw e;
  }
}
async function requestStock (user_id, product_id, qty) {
  try {
    if (qty < 1) return res.status(422).json({ message: "Invalid Quantity value" });
    const warehouse = await Warehouses.findOne({ where: { user_id } });
    let stock = await getStock(product_id, warehouse.id);
    if (!stock) await newStock(product_id, warehouse.id, 0);
    stock = await getStock(product_id, warehouse.id);
    const origin = await Stocks.findOne({
      where: {
        warehouse_id: {
          [Op.not]: warehouse.id
        }
      },
      include: {
        model: Warehouses,
        as: "warehouse"
      }
    });
    if (origin.qty < qty) return res.status(422).json({ message: "The requested warehouse doesn't have enough stock quantity" })
    const mutation = await StockMutations.create({
      stock_id: stock.id,
      warehouse_id: warehouse.id,
      sender_id: origin.warehouse_id,
      notes: `Stock Mutation Request from ${warehouse.warehouse_name}`,
      qty: Number(qty)
    });
    return mutation;
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

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function mutationList (req, res) {
  try {
    const role = req.user.role;
    const user_id = req.user.id;
    const warehouse = await Warehouses.findOne({ where: { user_id } });
    const page = Number(req.query?.page || 1);
    const where = role === "Admin" && warehouse ? { warehouse_id: warehouse.id }  : {};
    const { limit, offset } = paginate(page);
    const mutation = await StockMutations.findAndCountAll({ 
      where, 
      limit, 
      offset,
      include: [
        {
          model: Stocks,
          as: "stock",
          include: ["product"]
        },
        "sender",
        "warehouse",
      ]
    });
    const pages = Math.ceil(mutation.count / limit);
    return res.status(200).json({ message: "Fetch Success", ...mutation, page, pages });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

async function getJournals (req, res) {
  try {
    const page = Number(req.query?.page || 1);
    const { limit, offset } = paginate(page);
    const journals = await StockJurnals.findAndCountAll({ limit, offset });
    const pages = Math.ceil(journals.count / limit);
    return res.status(200).json({ message: "Fetch Success", ...journals, page, pages });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

const stockController = {
  stocksInfo,
  changeStock,
  newStock,
  requestStock,
  mutationList,
  changeRequestStatus,
  getJournals
};
module.exports = stockController;
module.exports.default = stockController;