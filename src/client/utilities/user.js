import * as Tokens from './tokens';
import { getNewAccessToken } from './server-fetch';
import { getItem, names } from './local-storage';

export function redirectUser(page, token) {
    const queryString = '?accessToken=' + token;
    window.location.assign(page + queryString);
}

export function isExistingUser() {
    const token = Tokens.getRefreshToken();
    return token ? true : false;
}

export async function processUser() {
    const accessToken = Tokens.getValidAccessToken();
    if (accessToken) {
        // if the access token is valid, then we
        // redirect straight to the the results page
        redirectUser('/results', accessToken);
    } else {
        // get the expired access token and the refresh token
        const tokens = Tokens.getAccessAndRefreshTokens();
        await Tokens.refreshAccessToken(tokens);
    }
}
