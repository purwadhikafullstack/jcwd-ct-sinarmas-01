const capitalize = require("./capitalize");
const createToken = require("./createToken");
const mailsend = require("./mailsend");
const hash = require("./hash");
const randomStr = require("./randomStr");
const regex = require("./regex");
const transporter = require("./transporter");
const uploader = require("./uploader");
const validation = require("./validation");
const paginate = require("./paginate");
const ongkir = require("./ongkir");
const toGeoStr = require("./toGeoStr");
const toLatLng = require("./toLatLng");
const compareDistance = require("./compareDistance");

module.exports = {
	capitalize,
	createToken,
	mailsend,
	hash,
	randomStr,
	regex,
	transporter,
	uploader,
	validation,
	paginate,
	ongkir,
	toGeoStr,
	toLatLng,
	compareDistance
}