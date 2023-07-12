const { models } = require("../models");
const { Checkouts, CheckoutItems, Addresses, Cities, Warehouses, CartItems } = models;
const { ongkir, compareDistance, toLatLng } = require("../lib");
const sequelize = require("sequelize");

async function newCheckout(user_id) {
	try {
		const checkout = await Checkouts.findOne({ where: { user_id } });
		if (checkout) return checkout;
		await Checkouts.create({ user_id });
		const newCheckout = await Checkouts.findOne({ where: { user_id }});
		return newCheckout;
	} catch (e) {
		console.error(e.message);
	}
}

const checkoutController = {
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	addItem: async function (req, res) {
		try {
			const user_id = req.user?.id;
			const { product_id, price, qty, item_id } = req.body;
			const checkout = await newCheckout(user_id);
			if (!checkout) return res.status(404).json({ message: "Checkout not found" });
			await CartItems.destroy({ where: { id: item_id } });
			const checkout_id = checkout.id;
			const item = await CheckoutItems.create({
				user_id, 
				checkout_id,
				price: price * qty,
				qty,
				product_id
			});
			checkout.total_price = checkout.total_price + item.price;
			checkout.total_qty = checkout.total_qty + item.qty;
			await checkout.save();
			console.log(checkout);
			return res.status(201).json({ message: "Item Added to Checkout", ...item.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	removeItem: async function (req, res) {
		try { 
			const { id } = req.params;
			const item = await CheckoutItems.destroy({ where: { id } });
			return res.status(200).json({ message: "Item Removed", item });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	calcShipping: async function (req, res) {
		try {
			const { address_id } = req.body;
			const address = await Addresses.findOne({ where: { id: address_id } });
			if (!address) return res.status(404).json({ message: "Address Not Found" });
			const warehouses = await Warehouses.findAll({ include: ["address"] });
			console.log(warehouses);
			const geos = warehouses.map((val) => {
				return {
					...toLatLng(val.address.geolocation),
					id: val.id
				} 
			});
			const dest = await Cities.findOne({ where: { city_name: address.city, type: address.type } });
			const destGeo = toLatLng(address.geolocation);
			const { place } = compareDistance(geos, destGeo)[0];
			const warehouse = await Warehouses.findOne({ where: { id: place.id }, include: ["address"] });
			const origin = await Cities.findOne({ 
				where: { 
					city_name: warehouse.address.city, 
					type: warehouse.address.type 
				} 
			});
			const shipping_fee = await ongkir.countFees(origin.id, dest.id)
			return res.status(200).json({ message: "Fetch Success" });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getItems: async function (req, res) {
		try {
			const user_id = req.user?.id;
			const checkout = await Checkouts.findOne({ 
				where: { user_id }, 
				include: ["checkout_items"],
				attributes: {
					include: [
						[sequelize.fn("SUM", sequelize.col("checkout_items.price")), "total_price"]	
					]
				}
			});
			console.log(checkout);
			return res.status(200).json({ message: "Fetch Success", ...checkout.dataValues });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	removeCheckout: async function (req, res) {
		try {
			const user_id = req.user?.id;
			const checkout = await Checkouts.destroy({ where: { user_id } });
			return res.status(200).json({ message: "Delete Success", checkout });
		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	}
};

module.exports = checkoutController;