module.exports = function toLatLng (str) {
	const [lat, lng] = str.replace(/\s/g, "").split(",");
	console.log({ lat, lng });
	return {
		lat: Number(lat),
		lng: Number(lng)
	};
}