function imageUrl (req) {
	const path = req.file?.path || "";
	const dest = path ? path.replace(/\\/g, "/").replace("public/", "images/") : null;
	const origin = `${req.protocol}://${req.headers.host}`;
	const url = path ? `${origin}/${dest}` : null;
	return url;
}

module.exports = imageUrl;
module.exports.default = imageUrl;