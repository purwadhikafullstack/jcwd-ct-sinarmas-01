const transporter = require("./transporter");

/**
 * Mengirim E-mail dengan Mudah tanpa memanggil transporternya
 * @param {string} subject
 * @param {string} to
 * @param {string} html
 * */
function compose(subject, to, html) {
	transporter.sendMail({
		subject,
		from: `Admin Multi Warehouse ${process.env.EMAIL_USER}`,
		to,
		html
	}).catch(err => {
		if(err) console.log(err);
	});
}

module.exports = {
	compose
};