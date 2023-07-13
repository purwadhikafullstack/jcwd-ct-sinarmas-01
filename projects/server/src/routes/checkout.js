const routes = require("express").Router();
const { checkoutController } = require("../controllers");
const { getItems, addItem, removeItem, removeCheckout, calcFees } = checkoutController;
const { verifyToken } = require("../middlewares/auth");

routes.get("/", verifyToken, getItems);
routes.post("/", verifyToken, addItem);
routes.delete("/", verifyToken, removeCheckout);
routes.delete("/:id", verifyToken, removeItem);

routes.post("/calc", verifyToken, calcFees);

module.exports = routes;