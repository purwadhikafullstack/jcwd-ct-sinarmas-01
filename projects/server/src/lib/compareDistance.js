const calcDist = require("./calcDistance");

/** @type {{ lat: number, lng, number }} LatLng **/

function compareDistance (origins, dest) {
	const arr = [];
	for (let i = 0; i < origins.length; i++) {
		arr.push({
			place: origins[i],
			distance: calcDist(origins[i], dest)
		});
	}
	arr.sort((a, b) => a.distance - b.distance);
	return arr;
}

module.exports = compareDistance