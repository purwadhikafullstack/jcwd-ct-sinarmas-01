const { models } = require("../models");
const { Carts, CartItems } = models;

const cartController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addToCart: async (req, res) => {
		try {

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	deleteFromCart: async (req, res) => {
		try {

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	increase: async (req, res) => {
		try {

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
};

module.exports = cartController;