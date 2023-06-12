const adminController = require("../controllers/admin");
const {
  warehouseList,
  addWarehouse,
  editWarehouse,
  removeWarehouse,
} = require("../controllers/warehouse");
const { verifyToken, checkRole } = require("../middlewares/auth");
const routes = require("express").Router();
const { body } = require("express-validator");
const isValid = require("../lib/validation");

routes.get("/", warehouseList);
routes.post("/", addWarehouse);
routes.put("/:warehouse_id", editWarehouse);
routes.delete("/:warehouse_id", removeWarehouse);
routes.post(
  "/admins",
  verifyToken,
  checkRole("Superadmin"),
  body("email").isEmail().withMessage("Email harus valid"),
  isValid,
  adminController.addUser
);
routes.delete("/admins/:user_id", verifyToken, checkRole("Superadmin"), adminController.removeUser);
routes.put("/admins/:user_id", verifyToken, checkRole("Superadmin"), adminController.editUser);

module.exports = routes;
