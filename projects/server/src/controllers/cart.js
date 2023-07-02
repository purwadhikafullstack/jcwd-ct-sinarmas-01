const { models } = require("../models");
const { Carts, CartItems } = models;

const cartController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addToCart: async function (req, res) {
		try {
			const { user_id, stock_id } = req.body;
			const cart = await Carts.findOne({ where: { user_id } });
			const item = await CartItems.findOne({ where: { stock_id, card_id: cart.id } });
			if (!item) {
				await CartItems.create({
					qty: 1,
					product_id,
					cart_id: cart.id
				});
			}
			if (item) {
				await CartItems.update({
					qty: item.qty + 1
				});
			}
			return res.status(201).json({ message: "Added to Cart", ...item.dataValues });
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