const authController = require("./auth");
const addressController = require("./address");
const adminController = require("./admin");
const warehouseController = require("./warehouse");
const accountController = require("./account");
const productController = require("./product");
const productTypeController = require("./product_type");

module.exports = {
  authController,
  addressController,
  adminController,
  warehouseController,
  accountController,
  productController,
  productTypeController
};
