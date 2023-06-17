const bcrypt = require("bcrypt");

const password = {
	hash: async (password) => {
		const hashed = await bcrypt.hash(password, process.env.PASSWORD_SALT);
		return hashed;
	},
	verify: async (password, hashed) => {
		const isCorrect = await bcrypt.compare(password, hashed);
		return isCorrect;
	}
}

module.exports = password;