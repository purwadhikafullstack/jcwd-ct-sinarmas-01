const { sequelize, initModels } = require("../../models");
const models = initModels(sequelize);
const { Users } = models;

const adminController = {
  openUser
};

module.exports = adminController;