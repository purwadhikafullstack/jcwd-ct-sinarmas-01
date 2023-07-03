const { cartController } = require("../controllers");
const { addToCart, deleteFromCart, getContents, increaseAmount } = cartController;
const routes = require("express").Router();

routes.get("/", getContents);
routes.post("/", addToCart);
routes.put("/:id", increaseAmount);
routes.delete("/:id", deleteFromCart);

module.exports = routes;
