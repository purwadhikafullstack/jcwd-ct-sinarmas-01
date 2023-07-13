const routes = require("express").Router();
const { verifyToken, checkRole } = require("../middlewares/auth");
const { orderController } = require("../controllers");
const { newOrder, acceptOrder, completeOrder, cancelOrder, userOrders, allOrders } = orderController;

routes.post("/", verifyToken, newOrder);
routes.put("/:id", verifyToken, checkRole(["admin"]), acceptOrder);
routes.patch("/:id", verifyToken, checkRole(["admin"]), completeOrder);
routes.delete("/:id", verifyToken, cancelOrder);
routes.get("/", verifyToken, userOrders);
routes.get("/all", verifyToken, checkRole(["admin"]), allOrders);

module.exports = routes;