const routes = require("express").Router();
const { verifyToken, checkRole } = require("../middlewares/auth");
const { orderController } = require("../controllers");
const { newOrder, changeStatus, userOrders, allOrders } = orderController;
const { uploader } = require("../lib");

const multer = uploader("payments", "pay-");
routes.post("/", verifyToken, multer.single("payment"), newOrder);
routes.put("/:id", verifyToken, checkRole(["admin"]), changeStatus);
routes.get("/", verifyToken, userOrders);
routes.get("/all", verifyToken, checkRole(["admin", "super"]), allOrders);

module.exports = routes;