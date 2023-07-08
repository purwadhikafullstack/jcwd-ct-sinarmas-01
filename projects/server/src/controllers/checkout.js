const { models } = require("../models");
const { Checkouts, CheckoutItems } = models;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * */
async function newCheckout(req, res) {
	try {
		
	} catch (e) {
		return res.status(500).json({ message: e.message, error: e });
	}
}

const checkoutController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addItem: async function (req, res) {
		try {

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
};

module.exports = checkoutController;