/**
 * @param {string} text
 * */
export default function cropText (str, length = 50) {
	const text = String(str);
	return `${text.substring(0, length)} ${text.length > length ? "..." : ""}`;
}