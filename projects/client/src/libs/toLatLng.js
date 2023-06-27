export default function toLatLng (str) {
	const [lat, lng] = str.split(", ");
	return {
		lat: Number(lat),
		lng: Number(lng)
	};
}