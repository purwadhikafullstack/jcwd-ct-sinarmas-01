const { models } = require("../models");
const { Carts, CartItems } = models;

const cartController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addToCart: async function (req, res) {
		try {
			
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	deleteFromCart: async function (req, res) {
		try {
			const { id } = req.params;
			await CartItems.destroy({ where: { id } });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	increase: async function (req, res) {
		try {

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getContents: async function (req, res) {
		try {
			const { user_id } = req.params;
			const cart = await Carts.findAndCountAll({ where: { user_id } });
			return res.status(200).json({ message: "Fetch Success", ...cart });
		}
		catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
};

module.exports = cartController;