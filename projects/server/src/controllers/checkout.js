const { models } = require("../models");
const { 
	Checkouts, 
	CheckoutItems, 
	Addresses, 
	Cities, 
	Warehouses, 
	CartItems, 
	Products, 
	Stocks 
} = models;
const { ongkir, compareDistance, toLatLng } = require("../lib");
const { Op } = require("sequelize");

async function checkoutExists (user_id) {
	try {
		const where = { where: { user_id, checked: 0 } };
		const checkout = await Checkouts.findOne(where);
		return checkout;
	} catch (e) {
		console.error(e.message);
	}
}

async function newCheckout(user_id) {
	try {
		const where = { user_id, checked: 0 };
		await Checkouts.create(where);
		const newCheckout = await Checkouts.findOne({ where });
		return newCheckout;
	} catch (e) {
		console.error(e.message);
	}
}


async function getNearest () {

}

async function calcFees(req, res) {
	try {
		const { address_id, checkout_id, courier } = req.body;
		const address = await Addresses.findOne({ where: { id: address_id } });
		const checkout = await Checkouts.findOne({ where: { id: checkout_id } });
		if (!address) return res.status(404).json({ message: "Address Not Found" });
		const warehouses = await Warehouses.findAll({ include: ["address"] });
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
		const { rajaongkir } = await ongkir.countFees(origin.id, dest.id, checkout.total_weight, courier);
		const shipping = rajaongkir.results[0].costs[0].cost[0].value;
		checkout.shipping_price = shipping;
		checkout.total_price = checkout.total_price + shipping;
		checkout.courier = courier;
		await checkout.save();
		return res.status(200).json({ message: "Fees Detail updated", ...checkout.dataValues });
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
			const user_id = req.user?.id;
			const { product_id, price, qty, item_id, weight } = req.body;
			const stock = await Stocks.findOne({
				where: {
					product_id,
					stock: {
						[Op.gte]: Number(qty)
					}
				},
				include: ["warehouse"]
			});
			if (!stock) return res.status(404).json({ message: "Item stock unavailable" });
			stock.stock = stock.stock - Number(qty);
			await stock.save();
			const exists = await checkoutExists(user_id);
			if (exists) return res.status(400).json({ message: "Complete your last order first" });
			const checkout = await newCheckout(user_id);
			await CartItems.destroy({ where: { id: item_id } });
			const checkout_id = checkout.id;
			const item = await CheckoutItems.create({
				user_id, 
				checkout_id,
				price: price * qty,
				qty,
				weight: weight * qty,
				stock_id: stock.id
			});
			checkout.total_price = checkout.total_price + item.price;
			checkout.total_qty = checkout.total_qty + item.qty;
			checkout.total_weight = checkout.total_weight + item.weight;
			await checkout.save();
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
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * */
	getItems: async function (req, res) {
		try {
			const user_id = req.user?.id;
			const checkout = await Checkouts.findOne({ 
				where: { user_id, checked: false }, 
				include: {
					model: CheckoutItems,
					as: "checkout_items",
					include: {
						model: Stocks,
						as: "stock",
						include: {
							model: Products,
							as: "product",
							attributes: ["product_name", "product_image"]
						}
					}
				}
			});
			if (!checkout) return res.status(204).json({ message: "No Items" });
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

module.exports = {...checkoutController, calcFees};