import rp from 'request-promise';

export const grantType = {
    AUTH: 'authorization_code',
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

export function _generateAccessBody(token) {
    return {
        form: {
            /* the auth code string the user first recieves 
            from an initial auth login to spotify  
            */
            code: token,
            redirect_uri: process.env.REDIRECT_URI, // the callback uri
            grant_type: grantType.AUTH
        }
    };
}

export function _generateRefreshBody(token) {
    return {
        form: {
            refresh_token: token,
            grant_type: grantType.REFRESH
        }
    };
}

export function generateAuthHeader(token, grant) {
    // the incoming code is either an access or refresh token
    const header = _initHeader();
    const body =
        grant === grantType.AUTH
            ? _generateAccessBody(token)
            : _generateRefreshBody(token);
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
