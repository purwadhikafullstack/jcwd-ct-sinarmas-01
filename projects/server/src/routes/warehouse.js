const adminController = require("../controllers/admin");
const {
  warehouseList,
  addWarehouse,
  editWarehouse,
  removeWarehouse,
  getWarehouse
} = require("../controllers/warehouse");
const { verifyToken, checkRole } = require("../middlewares/auth");
const routes = require("express").Router();
const { body } = require("express-validator");
const { authController } = require("../controllers");
const { registerUser } = authController;

routes.get("/", verifyToken, checkRole(["super", "admin"]), warehouseList);
routes.post("/", verifyToken, checkRole(["super"]), addWarehouse);
routes.put("/:warehouse_id", verifyToken, checkRole(["super"]), editWarehouse);
routes.delete("/:warehouse_id", verifyToken, checkRole(["super"]), removeWarehouse);
routes.post(
  "/admins",
  verifyToken,
  checkRole(["super"]),
  body("email").isEmail().withMessage("Email harus valid"),
  registerUser
);
routes.delete("/admins/:user_id", verifyToken, checkRole(["super"]), adminController.removeUser);
routes.put("/admins/:user_id", verifyToken, checkRole(["super"]), adminController.editUser);
routes.get("/:user_id", verifyToken, checkRole(["super", "admin"]), getWarehouse);

module.exports = routes;
