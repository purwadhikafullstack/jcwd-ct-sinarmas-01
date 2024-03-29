import Cookies from "js-cookie";

export function updateToken(token) {
	Cookies.set("login", token, { expires: 7 });
}

export function removeToken() {
	Cookies.remove("login");
}

export function getToken() {
	return Cookies.get("login");
}

export function decodeToken() {
	const token = getToken() || "";
	const json = token ? JSON.parse(atob(token.split(".")[1])) : {};
	return json;
}

export function isExpired() {
	const json = decodeToken();
	if (json?.exp * 1000 < Date.now()) {
		removeToken();
		return true;
	}
	return false;
}

export function getRole() {
	const json = decodeToken();
	const role = json.role || "";
	return role.toLowerCase();
}

export function getUsername() {
	const json = decodeToken();
	const username = json.username || "";
	return username;
}

export function getEmail() {
	const json = decodeToken();
	const email = json.email || "";
	return email;
}

export function getId() {
	const json = decodeToken();
	const id = json.id || null;
	return id;
}