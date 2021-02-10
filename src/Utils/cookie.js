import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const COOKIE_NAME = 'access_token'

export function getToken() {
    return Cookies.get(COOKIE_NAME) || ''
}

export function setToken(token) {
    Cookies.set(COOKIE_NAME, token)
}

export function removeToken() {
    Cookies.remove(COOKIE_NAME)
}

export function isLoggedIn() {
    return !!Cookies.get(COOKIE_NAME)
}

export function isAccessTokenExpired() {
    if (isLoggedIn()) {
        const { exp } = jwt_decode(this.getToken())
        return (exp - Date.now() / 1000 ) <= 0
    }
    else {
        return undefined
    }
}