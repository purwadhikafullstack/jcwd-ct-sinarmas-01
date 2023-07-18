const { models } = require("../models");
const { Carts, CartItems } = models;
const { Op } = require("sequelize");
const { isAvailable } =  require("../controllers/product");

async function cartExists(user_id) {
	const cart = await Carts.findOne({ where: { user_id } });
	return !!cart;
}
async function newCart(user_id) {
	try {
		const exists = await cartExists(user_id);
		let cart;
		if (exists) cart = await Carts.findOne({ where: { user_id } });
		if (!exists) cart = await Carts.create({ user_id });
		return cart;
	} catch (e) {
		throw e;
	}
}
async function getCart (user_id) {
	try {
		const cart = await Carts.findOne({ where: { user_id } });
		return cart;
	} catch (e) {
		throw e;
	}
}
const cartController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addToCart: async function (req, res) {
		try {
			const { product_id } = req.body;
			const { user_id } = req.params;
			const cart = await newCart(user_id);
			let item = await CartItems.findOne({ where: { product_id, cart_id: cart.id } });
			if (item) {
				const available = await isAvailable(product_id, item.qty + 1);
				if (!available) return res.status(422).json({ message: "Insufficient Item Stock" });
				item.qty = item.qty + 1;
				await item.save();
			}
			if (!item) {
				item = await CartItems.create({
					qty: 1,
					product_id,
					cart_id: cart.id
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
			const { user_id, product_id } = req.params;
			const cart = await getCart(user_id);
			const item = await CartItems.destroy({ where: { product_id, cart_id: cart.id } });
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
			const amount = Number(req.body?.amount) || 1;
			const { product_id, user_id } = req.params;
			const cart = await getCart(user_id);
			const where = { 
				cart_id: cart.id,
				product_id
			} ;
			const item = await CartItems.findOne({ where });
			const available = await isAvailable(product_id, item.qty + amount);
			if (!available) return res.status(422).json({ message: "Insufficient Item Stock" });
			await CartItems.increment({ qty: amount }, { where });
			return res.status(200).json({ message: "Amount Changed", ...item.dataValues });
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
			const cart = await Carts.findOne({ where: { user_id } });
			if (!cart) return res.status(204).json({ message: "Empty" });
			const where = { cart_id: cart.id }
			const item = await CartItems.findAndCountAll({ 
				where, 
				include: ["cart", "product"],
			});
			const quantity = await CartItems.sum("qty", { where });
			return res.status(200).json({ message: "Fetch Success", ...item, quantity });
		}
		catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getItem: async function (req, res) {
		try {
			const { user_id, product_id } = req.params;
			const item = await CartItems.findOne({ where: { user_id, product_id } });
			return res.status(200).json({ message: "Fetch Success", ...item.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getCart: async function (req, res) {
		try {
			const { user_id } = req.params;
			const cart = await Carts.findOne({ where: { user_id } });
			return res.status(200).json({ message: "Fetch Success", ...cart.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	deleteCart: async function (req, res) {
		try {
			const { user_id } = req.params;
			const cart = await Carts.destroy({ where: { user_id } });
			console.log({...cart});
			return res.status(200).json({ message: "Cart Deleted", ...cart });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	countCart: async function (req, res) {
		try {
			const { user_id } = req.params;
			const cart = await Carts.findOne({ where: { user_id } });
			const count = await CartItems.sum("qty", { where: { cart_id: cart.id } });
			return res.status(200).json({ message: "Fetch Success", ...count });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
};

module.exports = cartController;