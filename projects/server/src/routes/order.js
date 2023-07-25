const routes = require("express").Router();
const { verifyToken, checkRole } = require("../middlewares/auth");
const { orderController } = require("../controllers");
const { newOrder, changeStatus, allOrders, uploadProof } = orderController;
const { uploader } = require("../lib");

const multer = uploader("payments", "pay-");
routes.post("/", verifyToken, multer.single("payment"), newOrder);
routes.put("/:id", verifyToken, changeStatus);
routes.get("/all", verifyToken, allOrders);
routes.put("/proof/:id", verifyToken, uploadProof);

module.exports = routes;