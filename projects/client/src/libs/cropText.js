/**
 * @param {string} text
 * */
export default function cropText (str) {
	const text = String(str);
	return `${text.substring(0, 50)} ${text.length > 50 ? "..." : ""}`;
}