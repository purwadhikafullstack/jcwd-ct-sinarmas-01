const { cartController } = require("../controllers");
const { addToCart, deleteFromCart, getContents, increaseAmount, getItem } = cartController;
const routes = require("express").Router();

routes.get("/:user_id/items", getContents);
routes.post("/:user_id/items", addToCart);
routes.get("/:user_id/items/:product_id", getItem);
routes.put("/:user_id/items/:product_id", increaseAmount);
routes.delete("/:user_id/items/:product_id", deleteFromCart);

module.exports = routes;
