/**
 * @param {string} text
 * */
export default function cropText (text) {
	return `${text.substring(0, 50)} ${text.length > 50 && "..."}`;
}