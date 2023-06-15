export default function toLatLng (str) {
	const [lat, lng] = str.split(", ");
	console.log([lat, lng]);
	console.log(Number(lat));
	return {
		lat: Number(lat),
		lng: Number(lng)
	};
}