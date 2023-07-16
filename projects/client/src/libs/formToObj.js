/**
 * @param {FormData} formData
 * */
export default function formToObj(formData) {
	const data = {};
	formData.forEach((val, key) => (data[key] = val));
	return data;
}