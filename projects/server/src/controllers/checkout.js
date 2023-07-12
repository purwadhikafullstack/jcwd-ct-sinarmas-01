const { models } = require("../models");
const { Checkouts, CheckoutItems, Addresses, Cities, Warehouses } = models;
const { ongkir, compareDistance, toLatLng } = require("../lib");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * */
async function newCheckout(req, res) {
	try {
		const checkout = await Checkouts.findOne({ where: { id } });
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
	},
	removeItem: async function (req, res) {
		try { 

		} catch (e) {
			return res.status(500).json({ message: e.message, error: e });
		}
	},
	getOngkir: async function (req, res) {
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
	}
};

module.exports = checkoutController;