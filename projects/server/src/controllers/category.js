const { models } = require("../models");
const { Categories } = models;
const { paginate } = require("../lib");

const categoryController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addCategory: async function (req, res) {
		try {
			const { category_name } = req.body
			const category = await Categories.create({ category_name });
			return res.status(201).json({ message: "Category Added", ...category.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	editCategory: async function (req, res) {
		try {
			const { category_name } = req.body;
			const { id } = req.params;
			const category = await Categories.update({ category_name }, { where: { id } });

			return res.status(200).json({ message: "Category Edited", ...category.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	removeCategory: async function (req, res) {
		try {
			const { id } = req.params;
			const category = await Categories.destroy({ where: { id } });
			return res.status(200).json({ message: "Category Deleted", ...category });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getList: async function (req, res) {
		try {
			const { page } = req.query;
			const { offset, limit } = paginate(Number(page));
			const categories = await Categories.findAndCountAll({ offset, limit });
			return res.status(200).json({ message: "Fetch Success", ...categories });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
}

module.exports = categoryController;