import rp from 'request-promise';
import { generateAuthHeader, grantType } from '../authentication/header';

export async function requestTokens(authOptions) {
    try {
        const result = await rp.post(authOptions);
        return {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            expiryIn: result.expires_in
        };
    } catch (error) {
        throw error;
    }
}

export async function refreshAccessToken(req) {
    const refreshToken = req.body.refreshToken;
    const authOptions = generateAuthHeader(refreshToken, grantType.REFRESH);
    try {
        const result = await rp.post(authOptions);
        return {
            accessToken: result.access_token,
            expiryIn: result.expires_in
        };
    } catch (error) {
        throw error;
    }
}
