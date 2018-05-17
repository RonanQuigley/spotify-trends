import * as Token from './tokens';
import { getNewAccessToken } from './server-fetch';

export function redirectUser(page, token) {
    const queryString = '?accessToken=' + token;
    window.location.assign(page + queryString);
}

export function isExistingUser() {
    const names = Token.names;
    const token = Token.getToken(names.refreshToken);
    return token ? true : false;
}

export async function processUser() {
    const accessToken = Token.getValidAccessToken();
    if (accessToken) {
        // if the access token is valid, then we
        // redirect straight to the the results page
        redirectUser('/results', accessToken);
    } else {
        // get the expired access token and the refresh token
        const tokens = Token.getAccessAndRefreshTokens();
        await Token.refreshAccessToken(tokens);
    }
}
