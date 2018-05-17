import { generateAccessBody, generateRefreshBody } from './body';

export const grantType = {
    AUTH: 'authorization_code',
    REFRESH: 'refresh_token'
};

function initHeader() {
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

export function generateAuthHeader(token, grant) {
    // the incoming code is either an access or refresh token
    const header = initHeader();
    const body =
        grant === grantType.AUTH
            ? generateAccessBody(token)
            : generateRefreshBody(token);
    return Object.assign({}, body, header);
}
