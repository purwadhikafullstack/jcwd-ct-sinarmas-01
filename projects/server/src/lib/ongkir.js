require("dotenv/config");
const axios = require("axios").default;
const key = process.env.RAJAONGKIR_API_KEY;
const url = process.env.RAJAONGKIR_ENDPOINT

const headers = { 
	headers: {
		["key"]: key 
	}
}

async function getCities() {
	const { data } = await axios.get(`${url}/city`, headers);
	return data;
}

async function getCity(id) {
	const { data } = await axios.get(`${url}/city/?id=${id}`, headers);
	return data;
}

/**
 * Menghitung Ongkos Kirim
 * @param {string} origin
 * @param {string} destination
 * @param {number} weight
 * @param {string} courier
 * */
async function countFees(origin, destination, weight, courier) {
	const post = {
		origin, destination, weight, courier
	};
	const { data } = await axios.post(`${url}/cost`, post, headers);
	return data;
}

const ongkir = { getCities, getCity, countFees };
module.exports = ongkir
module.exports.default = ongkir;
module.exports.ongkir = ongkir;