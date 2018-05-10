import * as Tokens from './tokens';
import { getNewAccessToken } from './server-fetch';

const names = Tokens.names;

export function redirectUser(page, accessToken) {
    let queryString = '?accessToken' + accessToken;
    window.location.assign(page + queryString);
}

export function isExistingUser() {
    const token = Tokens.getToken(names.refreshToken);
    return token ? true : false;
}

export function processUser() {
    return redirectUser('/results', null);
    // const accessToken = Tokens.getValidAccessToken();
    // console.log(this);
    // console.log(redirectUser)
    // if (accessToken) {
    //     // if the access token is valid, then we
    //     // redirect straight to the the results page
    //     redirectUser('/results', accessToken);
    // } else {

    //     console.log("HEEEEEEEEEEEEERE")

    //     // get the expired access token and the refresh token
    //     const tokens = Tokens.getAccessAndRefreshTokens();
    //     Tokens.refreshAccessToken(tokens);
    // }
}
