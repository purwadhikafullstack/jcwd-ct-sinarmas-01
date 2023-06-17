import Cookies from "js-cookie";

const cookie = {
	set(key, value) {
		Cookies.set(key, value, process.env.COOKIE_EXPIRE);
	},
	get(key) {
		Cookies.get(key);
	},
	remove(key) {
		Cookies.remove(key);
	}
};

export default cookie;