const { models } = require("../models");
const { Checkouts, Orders, CheckoutItems, Users, Stocks, Warehouses, Products } = models;
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
  changeStatus: async function (req, res) {
    try {
      const { id } = req.params;
      const { status, rejected } = req.body;
      const order = await Orders.findByPk(id, {
        include: {
          model: Checkouts,
          as: "checkout",
          include: {
            model: CheckoutItems,
            as: "checkout_item",
            include: ["stock"]
          }
        }
      });
      order.status = status;
      order.isCompleted = true;
      if (rejected) 
        order.checkout.checkout_item.stock.stock = order.checkout?.checkout_item.stock.stock + order.checkout?.total_qty;
      await order.save();
      return res.status(200).json({ message: "Order Status Changed", ...order.dataValues });
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
      const orderMode = req.query?.desc ? "DESC" : "ASC";
      const { filter = "" } = req.query;
      const user_id = req.user.id;
      const user = req.user.role === "User" ? { user_id } : {};
      const admin = req.user?.role === "Admin" ? ({ id: req.user?.id }) : {};
      const where = filter ? { status: filter, ...user } : user;
      const orders = await Orders.findAndCountAll({ 
        limit, 
        offset,
        where,
        include: [
          {
            model: Checkouts,
            as: "checkout",
            include: [
              {
                model: CheckoutItems,
                as: "checkout_items",
                include: {
                  model: Stocks,
                  as: "stock",
                  include: {
                    model: Products,
                    as: "product",
                    attributes: ["product_name", "product_image"]
                  }
                }
              }  
            ]
          },
          {
            model: Warehouses,
            as: "warehouse",
            include: {
              model: Users,
              as: "user",
              where: admin
            }
          },
          "user"
        ],
        order: [["id", orderMode]]
      });
      const pages = Math.ceil(orders.count / limit);
      return res.status(200).json({ message: "Fetch Success", ...orders, page, pages });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  }
}

module.exports = orderController;
module.exports.default = orderController;