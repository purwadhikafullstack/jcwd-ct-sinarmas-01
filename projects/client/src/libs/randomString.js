/**
 * @param {number} length
 * @param {string} key
 * */
export default function randomString(key, length = 0) {
	const num = Math.random() * 99999999;
	const str = `${num}${key}`;
	let encrypted = str.split("").reverse().join("");
	encrypted = btoa(encrypted);
	encrypted = encrypted.substring(0, length || encrypted.length);
	return encrypted;
}