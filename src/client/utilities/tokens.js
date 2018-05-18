import { getQueryStringElement } from './url';
import { fetchData, generateHeader } from './server-fetch';
import { names, getItem, setItem } from './local-storage';

export function updateAccessAndExpiryTokens(accessToken, expiryIn) {
    setItem(names.accessToken, accessToken);
    setExpiry(expiryIn);
}

export function getAccessAndRefreshTokens() {
    return {
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken()
    };
}

export function isAccessTokenValid() {
    const expiry = getExpiry();
    const value = parseInt(expiry, 10);
    const token = getRefreshToken();
    const now = Date.now();
    return !!token && !!value && value > now ? true : false;
}

export function getAccessToken() {
    return getItem(names.accessToken);
}

export function getRefreshToken() {
    return getItem(names.refreshToken);
}

export function getExpiry() {
    const expiry = getItem(names.expiryIn);
    /* local storage uses strings and undefined can show up 
    as a string. we need to check for this */
    return expiry !== 'undefined' ? expiry : null;
}

export function setExpiry(expiry) {
    const now = Date.now();
    // add the number of ms to seconds, then
    // x 1000 to create an hour from now.
    const value = now + parseInt(expiry, 10) * 1000;
    setItem(names.expiryIn, value);
}

export function updateTokenFromUrl(tokenToUpdate) {
    const value = getQueryStringElement(tokenToUpdate);
    tokenToUpdate !== names.expiryIn
        ? setItem(tokenToUpdate, value)
        : setExpiry(value);
}

export function updateAllTokens() {
    /* this should be called on the results page */
    if (!isAccessTokenValid()) {
        /* access token is no longer valid
        update both the access token and expiry */
        updateTokenFromUrl(names.accessToken);
        updateTokenFromUrl(names.expiryIn);
    }
    // if (!getRefreshToken()) {
    //     /* refresh tokens are indefinite;
    //     this function isn't needed on the results page */
    //     updateTokenFromUrl(names.refreshToken);
    // } else {
    //     console.error('refresh token is missing');
    // }
}

export async function refreshAccessToken(refreshToken) {
    try {
        const header = generateHeader(refreshToken);
        const response = await fetchData('/refresh', header);
        const tokens = await response.json();
        if (
            typeof tokens.accessToken === 'undefined' ||
            typeof tokens.expiryIn === 'undefined'
        )
            throw new Error('server side error; missing tokens');
        return {
            accessToken: tokens.accessToken,
            expiryIn: tokens.expiryIn
        };
    } catch (error) {
        console.error(error);
    }
}
