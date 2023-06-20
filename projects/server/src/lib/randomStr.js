const crypto = require("crypto");

function randomStr (size = 30) {
	const length = Math.round(size/2);
	const generated = crypto.randomBytes(length).toString('hex');
	return generated;
}

module.exports = randomStr;