import { removeToken } from "./token";

export function logout () {
	removeToken("login");
}

export { default as login } from "./common/login";
export { default as register } from "./common/register";