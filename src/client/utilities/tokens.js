// based off of : http://kaaes.github.io/albums-availability/#18qY7zpuNqeXNGywRysjxx
import { getQueryStringElement } from '../utilities/uri';

export const names = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryIn: 'expiryIn'
};

export function setToken(name, value) {
    localStorage.setItem(name, value);
}

export function getToken(name) {
    return localStorage.getItem(name);
}

export function getAccessAndRefreshTokens() {
    return {
        accessToken: localStorage.getItem(names.accessToken),
        refreshToken: localStorage.getItem(names.refreshToken)
    };
}

export function getAccessTokenExpiry() {
    return localStorage.getItem(names.expiryIn);
}

export function setAccessTokenExpiry(expiry) {
    const now = Date.now();
    // add the number of ms to seconds, then
    // x 1000 to create an hour from now.
    const value = now + parseInt(expiry, 10) * 1000;
    localStorage.setItem(names.expiryIn, value);
}

export function getValidAccessToken() {
    const value = parseInt(localStorage.getItem(names.expiryIn), 10);
    const token = localStorage.getItem(names.accessToken);
    const now = Date.now();
    return !!token && !!value && value > now ? token : null;
}

export function updateTokens() {
    // check if any of our access tokens needs updating
    if (!getValidAccessToken()) {
        const value = getQueryStringElement(names.accessToken);
        setToken(names.accessToken, value);
    }
    // check if the refresh token exists first
    // otherwise we can add one in for future use
    if (!getToken(names.refreshToken)) {
        const value = getQueryStringElement(names.refreshToken);
        setToken(names.refreshToken, value);
    }
    // check if the expiry time is defined
    if (!getAccessTokenExpiry()) {
        const expiry = getQueryStringElement(names.expiryIn);
        setAccessTokenExpiry(expiry);
    }
}
