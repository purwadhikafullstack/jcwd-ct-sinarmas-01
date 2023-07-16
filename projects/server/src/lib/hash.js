const bcrypt = require("bcrypt");

const hash = {
	encrypt: async (password) => {
		const rounds = Number(process.env.PASSWORD_SALT || 6);
		const salt = await bcrypt.genSalt(rounds);
		const hashed = await bcrypt.hash(password, salt);
		return hashed;
	},
	verify: async (password, hashed) => {
		const isCorrect = await bcrypt.compare(password, hashed);
		return isCorrect;
	}
}

module.exports = hash;