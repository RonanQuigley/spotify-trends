import * as Tokens from './tokens';
import { redirect } from './url';

const page = '/results';

export function isExistingUser() {
    /* fastest way is to check if a refresh token exists */
    const token = Tokens.getRefreshToken();
    return token ? true : false;
}

export async function processUser() {
    if (Tokens.isAccessTokenValid()) {
        // if the access token is valid, then we
        // redirect straight to the the results page
        redirect(page, Tokens.getAccessToken());
    } else {
        // get the expired access token and the refresh token
        const refreshToken = Tokens.getRefreshToken();
        const result = await Tokens.refreshAccessToken(refreshToken);
        Tokens.updateAccessAndExpiryTokens(result.accessToken, result.expiryIn);
        redirect(page, Tokens.getAccessToken());
    }
}
