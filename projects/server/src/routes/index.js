const authRoutes = require("./auth");
const userRoutes = require("./user");
const addressRoutes = require("./address");
const warehouseRoutes = require("./warehouse");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const categoryRoutes = require("./category");
const checkoutRoutes = require("./checkout");

module.exports = {
  authRoutes,
  userRoutes,
  addressRoutes,
  warehouseRoutes,
  productRoutes,
  cartRoutes,
  categoryRoutes,
  checkoutRoutes
};
