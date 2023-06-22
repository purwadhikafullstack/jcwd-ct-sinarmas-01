const { checkRole, verifyToken } = require("../middlewares/auth");
const { productController } = require("../controllers");
const routes = require("express").Router();
const { uploader } = require("../lib");
const multer = uploader("products", "product-");

routes.post("/", multer.single("product_image"), productController.addProduct);
routes.put("/:id", multer.single("product_image"), productController.editProduct);
routes.delete("/:id", productController.deleteProduct);
routes.get("/", productController.getProducts);
routes.get("/:id", productController.getDetail);

module.exports = routes;