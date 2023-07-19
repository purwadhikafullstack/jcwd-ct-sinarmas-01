const { Router } = require("express");
const routes = Router();
const { stockController } = require("../controllers");
const { stocksInfo } = stockController;
const { verifyToken, checkRole } = require("../middlewares/auth");

routes.get("/", verifyToken, checkRole(["admin", "super"]), stocksInfo);

module.exports = routes;
module.exports.default = routes;