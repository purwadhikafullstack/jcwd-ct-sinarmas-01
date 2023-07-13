const DataTypes = require("sequelize").DataTypes;
const _AddressOwners = require("./AddressOwners");
const _Addresses = require("./Addresses");
const _CartItems = require("./CartItems");
const _Carts = require("./Carts");
const _Categories = require("./Categories");
const _CheckoutItems = require("./CheckoutItems");
const _Checkouts = require("./Checkouts");
const _Cities = require("./Cities");
const _Orders = require("./Orders");
const _Products = require("./Products");
const _Reset = require("./Reset");
const _StockJurnals = require("./StockJurnals");
const _StockMutations = require("./StockMutations");
const _Stocks = require("./Stocks");
const _TipeJurnals = require("./TipeJurnals");
const _Users = require("./Users");
const _Verification = require("./Verification");
const _Warehouses = require("./Warehouses");

function initModels(sequelize) {
  /** @type {typeof import("sequelize").Model} */
  const AddressOwners = _AddressOwners(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Addresses = _Addresses(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const CartItems = _CartItems(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Carts = _Carts(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Categories = _Categories(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const CheckoutItems = _CheckoutItems(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Checkouts = _Checkouts(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Cities = _Cities(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Orders = _Orders(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Products = _Products(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Reset = _Reset(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const StockJurnals = _StockJurnals(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const StockMutations = _StockMutations(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Stocks = _Stocks(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const TipeJurnals = _TipeJurnals(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Users = _Users(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Verification = _Verification(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */
  const Warehouses = _Warehouses(sequelize, DataTypes);
  /** @type {typeof import("sequelize").Model} */

  AddressOwners.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(AddressOwners, { as: "address_owners", foreignKey: "address_id"});
  Warehouses.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(Warehouses, { as: "warehouses", foreignKey: "address_id"});
  CartItems.belongsTo(Carts, { as: "cart", foreignKey: "cart_id"});
  Carts.hasMany(CartItems, { as: "cart_items", foreignKey: "cart_id"});
  Products.belongsTo(Categories, { as: "category", foreignKey: "category_id"});
  Categories.hasMany(Products, { as: "products", foreignKey: "category_id"});
  CheckoutItems.belongsTo(Checkouts, { as: "checkout", foreignKey: "checkout_id"});
  Checkouts.hasMany(CheckoutItems, { as: "checkout_items", foreignKey: "checkout_id"});
  Orders.belongsTo(Checkouts, { as: "checkout", foreignKey: "checkout_id"});
  Checkouts.hasMany(Orders, { as: "orders", foreignKey: "checkout_id"});
  CartItems.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(CartItems, { as: "cart_items", foreignKey: "product_id"});
  CheckoutItems.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(CheckoutItems, { as: "checkout_items", foreignKey: "product_id"});
  Stocks.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Stocks, { as: "stocks", foreignKey: "product_id"});
  StockJurnals.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "stock_id"});
  StockMutations.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(StockMutations, { as: "stock_mutations", foreignKey: "stock_id"});
  StockJurnals.belongsTo(TipeJurnals, { as: "tipe_jurnal", foreignKey: "tipe_jurnals_id"});
  TipeJurnals.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "tipe_jurnals_id"});
  AddressOwners.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(AddressOwners, { as: "address_owners", foreignKey: "user_id"});
  Carts.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Carts, { as: "carts", foreignKey: "user_id"});
  Checkouts.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Checkouts, { as: "checkouts", foreignKey: "user_id"});
  Orders.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Orders, { as: "orders", foreignKey: "user_id"});
  Reset.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Reset, { as: "resets", foreignKey: "user_id"});
  Verification.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Verification, { as: "verifications", foreignKey: "user_id"});
  Warehouses.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Warehouses, { as: "warehouses", foreignKey: "user_id"});
  StockJurnals.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(StockJurnals, { as: "stock_jurnals", foreignKey: "warehouse_id"});
  StockMutations.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(StockMutations, { as: "stock_mutations", foreignKey: "warehouse_id"});
  Stocks.belongsTo(Warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  Warehouses.hasMany(Stocks, { as: "stocks", foreignKey: "warehouse_id"});

  return {
    AddressOwners,
    Addresses,
    CartItems,
    Carts,
    Categories,
    CheckoutItems,
    Checkouts,
    Cities,
    Orders,
    Products,
    Reset,
    StockJurnals,
    StockMutations,
    Stocks,
    TipeJurnals,
    Users,
    Verification,
    Warehouses,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
