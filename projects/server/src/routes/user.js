const accountController = require("../controllers/account");
const routes = require("express").Router();

routes.get("/", accountController.allUsers);

module.exports = routes;