const { models } = require("../models");
const { Products, Stocks } = models;
const { paginate } = require("../lib");

async function getStock (product_id) {
	const stock = await Stocks.sum("stock", { where: { product_id } });
	return stock;
}

async function isAvailable (product_id, qty) {
	const stock = await getStock(product_id);
	return stock >= qty;
}

const productController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addProduct: async function (req, res) {
		try {
			const { product_name, desc, price, weight } = req.body;
			const path = req.file?.path || "";
			const dest = path ? path
				.replace(/\\/g, "/")
				.replace("public/", "") : null;
			const origin = `${req.protocol}://${req.headers.host}`;
			const product_image = path ? `${origin}/${dest}` : `${origin}/default-image.jpg`;
			const product = await Products.create({
				product_name,
				desc,
				product_image,
				price: price.replace(/[^0-9]/g, ""),
				weight: weight.replace(/[^0-9]/g, "")
			});
			return res.status(201).json({ message: "Product Added", product });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: e.errors ? e.errors[0].message : e.message });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	editProduct: async function (req, res) {
		try {
			const { id } = req.params;
			const { product_name, desc, price, weight, category_id } = req.body;
			console.log(req.body);
			const path = req?.file?.path || "";
			const dest = path ? path
				.replace(/\\/g, "/")
				.replace("public/", "") : null;
			const product = await Products.findOne({ where: { id } });
			const product_image = (path && dest) ? `${req.protocol}://${req.headers.host}/${dest}` : null;
			product.product_name = product_name || product.product_name;
			product.product_image = product_image || product.product_image;
			product.desc = desc || product.desc;
			product.category_id = category_id || product.category_id;
			product.price = price.replace(/[^0-9]/g, "") || product.price;
			product.weight = weight.replace(/[^0-9]/g, "") || product.weight;
			await product.save();
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
			const { page = 1, filter = "", sort = "ASC" } = req.query;
			const { offset, limit } = paginate(Number(page));
			const where = filter ? { category_id: filter } : {}
			const query = page > 0 ? { 
				where,
				limit, 
				offset, 
				order: [["product_name", sort]],
				include: ["category"] 
			} : { attributes: ["id", "product_name"] };
			const products = await Products.findAndCountAll(query);
			const next = Number(page) + 1;
			const pages = Math.ceil(products.count / limit);
			const result = {
				...products, 
				page: Number(page),
				pages,
				nextPage: (next <= pages) ? next : null
			}
			console.log(result);
			return res.status(200).json({ message: "Fetch success", ...result });
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
			const stock = await getStock(id);
			const product = await Products.findByPk(id);
			return res.status(200).json({ 
				message: "Fetch success",
				stock,
				...product.dataValues
			});
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = {
	...productController,
	isAvailable
};