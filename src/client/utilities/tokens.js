import { getQueryStringElement } from './uri';
import { fetchData, generateHeader } from './server-fetch';
import { names, getItem, setItem } from './local-storage';

import * as User from './user';

export function updateAccessAndExpiryTokens(accessToken, expiryIn) {
    setToken(names.accessToken, accessToken);
    setAccessTokenExpiry(expiryIn);
}

export function getAccessAndRefreshTokens() {
    return {
        accessToken: getItem(names.accessToken),
        refreshToken: getItem(names.refreshToken)
    };
}

export function getRefreshToken() {
    return getItem(names.refreshToken);
}

export function getAccessTokenExpiry() {
    const value = getItem(names.expiryIn);
    /* local storage uses strings and undefined can show up 
    as a string. we need to check for this */
    return value !== 'undefined' ? value : null;
}

export function setAccessTokenExpiry(expiry) {
    const now = Date.now();
    // add the number of ms to seconds, then
    // x 1000 to create an hour from now.
    const value = now + parseInt(expiry, 10) * 1000;
    setItem(names.expiryIn, value);
}

export function getValidAccessToken() {
    const value = parseInt(getItem(names.expiryIn), 10);
    const token = getItem(names.accessToken);
    const now = Date.now();
    return !!token && !!value && value > now ? token : null;
}

export function updateTokenFromUrl(tokenToUpdate) {
    const value = getQueryStringElement(tokenToUpdate);
    tokenToUpdate !== names.expiryIn
        ? setToken(tokenToUpdate, value)
        : setAccessTokenExpiry(value);
}

export function updateAllTokens() {
    if (!getValidAccessToken()) {
        /* access token is no longer valid
        update both the access token and expiry */
        updateTokenFromUrl(names.accessToken);
        updateTokenFromUrl(names.expiryIn);
    }
    if (!getToken(names.refreshToken)) {
        /* refresh tokens are indefinite; this means this 
        should only be called for a new user */
        updateTokenFromUrl(names.refreshToken);
    }
}

export async function refreshAccessToken(tokens) {
    if (tokens.accessToken && tokens.refreshToken) {
        try {
            const results = await getNewAccessToken(
                tokens.refreshToken,
                tokens.accessToken
            );
            if (
                typeof results.accessToken === 'undefined' ||
                typeof results.expiryIn === 'undefined'
            )
                throw new Error('server side error; missing tokens');
            updateAccessAndExpiryTokens(results.accessToken, results.expiryIn);
        } catch (error) {
            console.error(error);
        }
    }
}

export async function getNewAccessToken(refreshToken, expiredToken) {
    const header = generateHeader(refreshToken, expiredToken);
    const response = await fetchData('/refresh', header);
    const tokens = await response.json();
    return {
        accessToken: tokens.accessToken,
        expiryIn: tokens.expiryIn
    };
}
