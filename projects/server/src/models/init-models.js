const DataTypes = require("sequelize").DataTypes;
const _AddressOwners = require("./AddressOwners");
const _Addresses = require("./Addresses");
const _CartItems = require("./CartItems");
const _Carts = require("./Carts");
const _Categories = require("./Categories");
const _CheckoutItems = require("./CheckoutItems");
const _Checkouts = require("./Checkouts");
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
  const AddressOwners = _AddressOwners(sequelize, DataTypes);
  const Addresses = _Addresses(sequelize, DataTypes);
  const CartItems = _CartItems(sequelize, DataTypes);
  const Carts = _Carts(sequelize, DataTypes);
  const Categories = _Categories(sequelize, DataTypes);
  const CheckoutItems = _CheckoutItems(sequelize, DataTypes);
  const Checkouts = _Checkouts(sequelize, DataTypes);
  const Products = _Products(sequelize, DataTypes);
  const Reset = _Reset(sequelize, DataTypes);
  const StockJurnals = _StockJurnals(sequelize, DataTypes);
  const StockMutations = _StockMutations(sequelize, DataTypes);
  const Stocks = _Stocks(sequelize, DataTypes);
  const TipeJurnals = _TipeJurnals(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);
  const Verification = _Verification(sequelize, DataTypes);
  const Warehouses = _Warehouses(sequelize, DataTypes);

  AddressOwners.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(AddressOwners, { as: "address_owners", foreignKey: "address_id"});
  Warehouses.belongsTo(Addresses, { as: "address", foreignKey: "address_id"});
  Addresses.hasMany(Warehouses, { as: "warehouses", foreignKey: "address_id"});
  CartItems.belongsTo(Carts, { as: "cart", foreignKey: "cart_id"});
  Carts.hasMany(CartItems, { as: "cart_items", foreignKey: "cart_id"});
  Products.belongsTo(Categories, { as: "category", foreignKey: "category_id"});
  Categories.hasMany(Products, { as: "products", foreignKey: "category_id"});
  Checkouts.belongsTo(CheckoutItems, { as: "checkout_item", foreignKey: "checkout_items_id"});
  CheckoutItems.hasMany(Checkouts, { as: "checkouts", foreignKey: "checkout_items_id"});
  CartItems.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(CartItems, { as: "cart_items", foreignKey: "product_id"});
  Stocks.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Stocks, { as: "stocks", foreignKey: "product_id"});
  CheckoutItems.belongsTo(Stocks, { as: "stock", foreignKey: "stock_id"});
  Stocks.hasMany(CheckoutItems, { as: "checkout_items", foreignKey: "stock_id"});
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
