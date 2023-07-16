const { categoryController } = require("../controllers");
const { addCategory, editCategory, removeCategory, getList } = categoryController;
const { verifyToken, checkRole } = require("../middlewares/auth");
const routes = require("express").Router();

const verif = [verifyToken, checkRole(["Super"])];
routes.get("/", ...verif, getList);
routes.post("/", ...verif, addCategory);
routes.put("/:id", ...verif, editCategory);
routes.delete("/:id", ...verif, removeCategory);

module.exports = routes;