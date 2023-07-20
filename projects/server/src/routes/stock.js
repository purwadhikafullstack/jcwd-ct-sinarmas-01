const { Router } = require("express");
const routes = Router();
const { stockController } = require("../controllers");
const { stocksInfo, requestStock } = stockController;
const { verifyToken, checkRole } = require("../middlewares/auth");

routes.get("/", verifyToken, checkRole(["admin", "super"]), stocksInfo);
routes.post("/request", verifyToken, checkRole(["admin"]), async (req, res) => {
  const { product_id, qty, sender_id } = req.body;
  const user_id = req.user.id;
  const mutation = await requestStock(user_id, product_id, sender_id, qty);
  return res.status(201).json({ message: "Stock Mutation Issued", ...mutation.dataValues });
});

module.exports = routes;
module.exports.default = routes;