const addressController = require("../controllers/address");
const routes = require("express").Router();
const authMiddleware = require("../middlewares/auth");

// routes.get("/", authMiddleware.getUser, authMiddleware.isAdmin, addressController.listAddresses);
// routes.post("/", authMiddleware.getUser, authMiddleware.isAdmin, addressController.newAddress);
routes.get("/", addressController.listAddresses);
routes.post("/", addressController.newAddress);
routes.post("/search", addressController.searchLocation);

module.exports = routes;