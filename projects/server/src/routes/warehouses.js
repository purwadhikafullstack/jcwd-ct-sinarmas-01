const warehouseController = require("../controllers/warehouse");
const authMiddleware = require("../middlewares/auth");
const routes = require("express").Router();

routes.get("/", warehouseController.warehouseList);
routes.post("/", warehouseController.addWarehouse);
routes.put("/:warehouse_id", warehouseController.editWarehouse);
routes.delete("/:warehouse_id", warehouseController.removeWarehouse);

module.exports = routes;