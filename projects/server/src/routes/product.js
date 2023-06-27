const { checkRole, verifyToken } = require("../middlewares/auth");
const { productController } = require("../controllers");
const { addProduct, editProduct, deleteProduct, getProducts, getDetail } = productController;
const routes = require("express").Router();
const { uploader } = require("../lib");
const multer = uploader("products", "product-");
const superRole = [verifyToken, checkRole(["super"])];

routes.post("/", ...superRole, multer.single("product_image"), addProduct);
routes.put("/:id", ...superRole, multer.single("product_image"), editProduct);
routes.delete("/:id", ...superRole, deleteProduct);
routes.get("/", getProducts);
routes.get("/:id", getDetail);

module.exports = routes;