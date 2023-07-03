const { models } = require("../models");
const { Carts, CartItems, Stocks } = models;

const cartController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addToCart: async function (req, res) {
		try {
			const { user_id, product_id } = req.body;
			const cart = await Carts.findOne({ where: { user_id } });
			let item = await CartItems.findOne({ where: { stock_id, card_id: cart.id } });
			if (!item) {
				item = await CartItems.create({
					qty: 1,
					product_id,
					cart_id: cart.id
				});
			}
			if (item) {
				item.qty = item.qty + 1;

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
			const item = await CartItems.destroy({ where: { id } });
			console.log({...item});
			return res.status(200).json({ message: "Cart Item removed", item })
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	increaseAmount: async function (req, res) {
		try {
			const { amount } = req.query;
			const { id } = req.params;
			const item = await CartItems.findOne({ where: { id } });
			item.qty = (item.qty > amount) ? (item.qty - amount) : 0;
			await item.save();
			return res.status(200).json({ message: "Amount Changed", item });
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