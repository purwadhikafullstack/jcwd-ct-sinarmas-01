var DataTypes = require("sequelize").DataTypes;
var _Addresses = require("./Addresses");
var _CartItems = require("./CartItems");
var _Carts = require("./Carts");
var _Categories = require("./Categories");
var _CheckoutItems = require("./CheckoutItems");
var _Checkouts = require("./Checkouts");
var _ProductTypes = require("./ProductTypes");
var _Products = require("./Products");
var _Profiles = require("./Profiles");
var _StockJurnals = require("./StockJurnals");
var _StockMutations = require("./StockMutations");
var _Stocks = require("./Stocks");
var _TipeJurnals = require("./TipeJurnals");
var _Users = require("./Users");
var _Warehouses = require("./Warehouses");

function initModels(sequelize) {
  var Addresses = _Addresses(sequelize, DataTypes);
  var CartItems = _CartItems(sequelize, DataTypes);
  var Carts = _Carts(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var CheckoutItems = _CheckoutItems(sequelize, DataTypes);
  var Checkouts = _Checkouts(sequelize, DataTypes);
  var ProductTypes = _ProductTypes(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Profiles = _Profiles(sequelize, DataTypes);
  var StockJurnals = _StockJurnals(sequelize, DataTypes);
  var StockMutations = _StockMutations(sequelize, DataTypes);
  var Stocks = _Stocks(sequelize, DataTypes);
  var TipeJurnals = _TipeJurnals(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Warehouses = _Warehouses(sequelize, DataTypes);

  Profiles.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(Profiles, { as: "profiles", foreignKey: "address_id"});
  Warehouses.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(Warehouses, { as: "warehouses", foreignKey: "address_id"});
  CartItems.belongsTo(Carts, { as: "cart", foreignKey: "cart_id"});
  Carts.hasMany(CartItems, { as: "cart_items", foreignKey: "cart_id"});
  Products.belongsTo(Categories, { as: "category", foreignKey: "category_id"});
  Categories.hasMany(Products, { as: "products", foreignKey: "category_id"});
  Checkouts.belongsTo(CheckoutItems, { as: "checkout_item", foreignKey: "checkout_items_id"});
  CheckoutItems.hasMany(Checkouts, { as: "checkouts", foreignKey: "checkout_items_id"});
  Stocks.belongsTo(ProductTypes, { as: "product_type", foreignKey: "product_type_id"});
  ProductTypes.hasMany(Stocks, { as: "stocks", foreignKey: "product_type_id"});
  ProductTypes.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(ProductTypes, { as: "product_types", foreignKey: "product_id"});
  Carts.belongsTo(Profiles, { as: "profile", foreignKey: "profile_id"});
  Profiles.hasMany(Carts, { as: "carts", foreignKey: "profile_id"});
  CartItems.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(CartItems, { as: "cart_items", foreignKey: "stock_id"});
  CheckoutItems.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(CheckoutItems, { as: "checkout_items", foreignKey: "stock_id"});
  StockJurnals.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "stock_id"});
  StockMutations.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(StockMutations, { as: "stock_mutations", foreignKey: "stock_id"});
  StockJurnals.belongsTo(TipeJurnals, { as: "tipe_jurnal", foreignKey: "tipe_jurnal_id"});
  TipeJurnals.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "tipe_jurnal_id"});
  Profiles.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Profiles, { as: "profiles", foreignKey: "user_id"});
  StockMutations.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(StockMutations, { as: "stock_mutations", foreignKey: "user_id"});
  Warehouses.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Warehouses, { as: "warehouses", foreignKey: "user_id"});
  StockJurnals.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "warehouse_id"});
  StockMutations.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(StockMutations, { as: "stock_mutations", foreignKey: "warehouse_id"});
  Stocks.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(Stocks, { as: "stocks", foreignKey: "warehouse_id"});

  return {
    Addresses,
    CartItems,
    Carts,
    Categories,
    CheckoutItems,
    Checkouts,
    ProductTypes,
    Products,
    Profiles,
    StockJurnals,
    StockMutations,
    Stocks,
    TipeJurnals,
    Users,
    Warehouses,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
