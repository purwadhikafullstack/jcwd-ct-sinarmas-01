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
	paginate
}