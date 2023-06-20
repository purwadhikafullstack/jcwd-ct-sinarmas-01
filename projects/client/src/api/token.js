import Cookies from "js-cookie";

export function updateToken(token) {
	Cookies.set("login", token, process.env.COOKIE_EXPIRE);
}

export function removeToken() {
	Cookies.remove("login");
}

export function getToken() {
	return Cookies.get("login");
}

export default {
	updateToken, removeToken, getToken
}