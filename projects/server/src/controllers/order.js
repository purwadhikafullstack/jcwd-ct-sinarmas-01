const { models } = require("../models");
const { Checkouts, Orders } = models;
const { paginate } = require("../lib");

const orderController = {
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns 
   */
  newOrder: async function (req, res) {
    try {
      const { checkout_id } = req.body;
      const checkout = await Checkouts.findByPk(checkout);
      const path = req.file?.path || "";
      const dest = path ? path
        .replace(/\\/g, "/")
        .replace("public/", "") : null;
      const origin = `${req.protocol}://${req.headers.host}`;
      const payment_proof = path ? `${origin}/${dest}` : null;
      const order = await Orders.create({
        status: "Pending",
        payment_proof,
        checkout_id,
        user_id: checkout.user_id,
        isCompleted: false
      });
      return res.status(201).json({ message: "Order Created", ...order.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  cancelOrder: async function (req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findByPk(id);
      order.status = "Cancelled";
      await order.save();
      return res.status(200).json({ message: "Order Cancelled", ...order.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  acceptOrder: async function (req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findByPk(id);
      order.status = "Accepted";
      await order.save();
      return res.status(200).json({ message: "Order Accepted by Admin", ...order.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  },
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  completeOrder: async function (req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findByPk(id);
      order.status = "Completed";
      await order.save();
      await Checkouts.destroy({ where: { id: order.checkout_id } });
      return res.status(200).json({ message: "Order Completed", ...order.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  },
  userOrders: async function (req, res) {
    try {
      const user_id = req.user?.id;
      const page = Number(req.query?.page) || 1;
      const { limit, offset } = paginate(page);
      const orders = await Orders.findAndCountAll({
        where: { user_id },
        limit,
        offset
      });
      const pages = Math.ceil(orders.count / limit);
      return res.status(200).json({ message: "Fetch Success", ...orders, page, pages });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  }
}

module.exports = orderController;