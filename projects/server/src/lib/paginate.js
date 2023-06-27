function pagination(page = 1, limit = 5) {
	const offset = (page > 0) ? (page-1) * limit : 0;
	return {
		offset, limit
	}
}

module.exports = pagination;