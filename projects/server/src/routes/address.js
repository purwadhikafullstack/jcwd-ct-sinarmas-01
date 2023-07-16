const { addressController } = require("../controllers");
const routes = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const {
	getUserAddresses,
	editAddress,
	removeAddress,
	newAddress,
	searchLocation,
	addressDetail,
} = addressController;

routes.get("/", verifyToken, getUserAddresses);
routes.post("/", verifyToken, newAddress);
routes.post("/search", verifyToken, searchLocation);
routes.put("/:id", verifyToken, editAddress);
routes.delete("/:id", verifyToken, removeAddress);
routes.get("/:id", verifyToken, addressDetail);

module.exports = routes;
