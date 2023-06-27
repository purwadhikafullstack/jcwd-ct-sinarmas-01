const { models } = require("../models");
const { ProductTypes } = models;
const { paginate } = require("../lib");

const productTypeController = {
	/**
	 * Menambah tipe produk baru
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addType: async function (req, res) {
		try {
			const { storage, color, price } = req.body;
			const { product_id } = req.params;
			const productType = await ProductTypes.create({
				storage, color, price, product_id
			});
			return res.status(201).json({ message: "Type Added", productType });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	/**
	 * Mengedit tipe produk
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	editType: async function (req, res) {
		try {
			const { storage, color, price } = req.body;
			const { product_id, id } = req.params;
			const productType = await ProductTypes.update({
				storage, color, price
			}, {
				where: { product_id, id }
			});
			return res.status(200).json({ message: "Edit Success", productType });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	/**
	 * Menghapus tipe produk
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	deleteType: async function (req, res) {
		try {
			const { product_id, id } = req.params;
			const productType = await ProductTypes.destroy({
				where: { id, product_id }
			});
			return res.status(200).json({ message: "Delete Success", productType });
		} catch (err) {
			return res.status(500).json({ message: err.message, err });
		}
	},
	/**
	 * Mengambil semua tipe produk
	 * @param {import("express").Request} req 
	 * @param {import("express").Response} res 
	 */
	getTypes: async function (req, res) {
		try {
			const page = Number(req.params?.page);
			const { offset, limit } = paginate(page);
			const productTypes = await ProductTypes.findAndCountAll({
				limit, offset
			});
			
			return res.status(200).json({ message: "Fetch Success", ...productTypes });
		} catch (error) {
			return res.status(500).json({ message: error.message, error });
		}
	}
};

module.exports = productTypeController;