const { models } = require("../models");
const { Checkouts, Orders, CheckoutItems, Users, Products, Stocks, Warehouses } = models;
const { paginate, imageUrl } = require("../lib");

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
      const checkout = await Checkouts.findByPk(checkout_id, {
        include: {
          model: CheckoutItems,
          as: "checkout_items",
          include: {
            model: Stocks,
            as: "stock",
            include: {
              model: Warehouses,
              as: "warehouse"
            }
          }
        }
      });
      checkout.checked = true;
      await checkout.save();
      console.log(JSON.stringify(checkout));
      if (!req.file) return res.status(422).json({ message: "Upload your payment please" });
      const payment_proof = imageUrl(req);
      const order = await Orders.create({
        status: "Pending",
        payment_proof,
        checkout_id,
        warehouse_id: checkout.checkout_items[0]?.stock?.warehouse?.id,
        user_id: checkout.user_id,
        isCompleted: false,
      });
      console.log(order);
      return res.status(201).json({ message: "Order Created", ...order.dataValues });
    } catch (e) {
      console.log({ message: e.message, e });
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
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns 
   */
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
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  allOrders: async function (req, res) {
    try {
      const page = Number(req.query?.page) || 1;
      const { limit, offset } = paginate(page);
      const where = req.user?.role === "admin" ? ({ user_id: req.user?.id }) : {};
      const orders = await Orders.findAndCountAll({ 
        limit, 
        offset,
        include: [
          {
            model: Checkouts,
            as: "checkout",
            include: [
              {
                model: CheckoutItems,
                as: "checkout_items",
                include: ["stock"]
              }  
            ]
          },
          {
            model: Warehouses,
            as: "warehouse",
            include: {
              model: Users,
              as: "user",
              where
            }
          },
          "user"
        ]
      });
      const pages = Math.ceil(orders.count /limit);
      return res.status(200).json({ message: "Fetch Success", ...orders, page, pages });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  }
}

module.exports = orderController;
module.exports.default = orderController;