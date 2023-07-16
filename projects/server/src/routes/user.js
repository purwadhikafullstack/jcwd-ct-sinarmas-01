const accountController = require("../controllers/account");
const routes = require("express").Router();

routes.get("/", accountController.allUsers);
routes.get("/:email", accountController.userDetail);

module.exports = routes;