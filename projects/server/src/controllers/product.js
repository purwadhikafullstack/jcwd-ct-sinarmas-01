const { models } = require("../models");
const { Products } = models;
const { paginate } = require("../lib");

const productController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addProduct: async function (req, res) {
		try {
			const { product_name, desc } = req.body;
			const { path } = req.file;
			const dest = path ? path
				.replace(/\\/g, "/")
				.replace("public/", "") : null;
			const product_image = path && `${req.protocol}://${req.headers.host}/${dest}`;
			const product = await Products.create({
				product_name,
				desc,
				product_image,
			});
			return res.status(201).json({ message: "Product Added", product });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	editProduct: async function (req, res) {
		try {
			const { id } = req.params;
			const { product_name, desc } = req.body;
			const { path } = req.file;
			const dest = path ? path
				.replace(/\\/g, "/")
				.replace("public/", "") : null;
			const product_image = path && `${req.protocol}://${req.headers.host}/${dest}`;
			const product = await Products.update({
				product_name, desc, product_image
			}, {
				where: { id }
			});
			return res.status(200).json({ message: "Product Edited", product });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	deleteProduct: async function (req, res) {
		try {
			const { id } = req.params;
			const product = await Products.destroy({
				where: { id }
			});
			return res.status(200).json({ message: "Product Deleted", product });
		} catch(e) {
			return res.status(500).json({ message: e.message });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getProducts: async function (req, res) {
		try {
			const { page } = req.query;
			const { offset, limit } = paginate(Number(page));
			const products = await Products.findAndCountAll({ limit, offset });

			return res.status(200).json({ message: "Fetch success", ...products });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getDetail: async function (req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findOne({ where: { id } });
			return res.status(200).json({ message: "Fetch success", product});
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = productController;