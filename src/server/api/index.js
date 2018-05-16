import rp from 'request-promise';

export const grantType = {
    AUTHORIZE: 'authorization_code',
    REFRESH: 'refresh_token'
};

export function _initHeader() {
    return {
        url: 'https://accounts.spotify.com/api/token',
        json: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                new Buffer.from(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')
        }
    };
}

export function _generateBody(token, grant) {
    return {
        form: {
            code: token, // the authorizaton code string
            redirect_uri: process.env.REDIRECT_URI, // the callback uri
            grant_type: grant
        }
    };
}

export function generateAuthHeader(token, grant) {
    // the incoming token for spotify is a refresh token
    const header = _initHeader();
    const body = _generateBody(token, grant);
    return Object.assign({}, body, header);
}

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
            accessToken: result.body.access_token,
            expiryIn: result.body.expires_in
        };
    } catch (error) {
        throw error;
    }
}
