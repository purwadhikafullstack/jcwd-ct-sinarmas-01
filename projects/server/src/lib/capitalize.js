module.exports = function capitalize(str) {
	let lowered = str.toLowerCase().split("");
	lowered[0] = lowered[0].toUpperCase();
	return lowered.join("");
}