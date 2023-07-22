const { Router } = require("express");
const routes = Router();
const { stockController } = require("../controllers");
const { stocksInfo, requestStock, mutationList, changeRequestStatus, getJournals, newStock } = stockController;
const { verifyToken, checkRole } = require("../middlewares/auth");

routes.get("/", verifyToken, checkRole(["admin", "super"]), stocksInfo);
routes.post("/", verifyToken, checkRole(["super"]), async (req, res) => {
  const { product_id, warehouse_id } = req.body;
  const qty = Number(req.body?.qty || 1);
  await newStock(product_id, warehouse_id, qty);
  return res.status(200).json({ message: "Stock Created" });
});
routes.post("/request", verifyToken, checkRole(["admin"]), async (req, res) => {
  const { product_id, qty } = req.body;
  const user_id = req.user.id;
  const mutation = await requestStock(user_id, product_id, Number(qty));
  return res.status(201).json({ message: "Stock Mutation Issued", ...mutation.dataValues });
});
routes.get("/request", verifyToken, checkRole(["admin", "super"]), mutationList);
routes.put("/request", verifyToken, checkRole(["super"]), async (req, res) => {
  const { id } = req.body;
  const mutation = await changeRequestStatus(id, true);
  return res.status(200).json({ message: "Request Status changed", ...mutation.dataValues });
})
routes.get("/journals", verifyToken, checkRole(["super"]), getJournals);

module.exports = routes;
module.exports.default = routes;