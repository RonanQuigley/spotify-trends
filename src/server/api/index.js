import rp from 'request-promise';

function generateAuthOptions(authCode) {
    return {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: authCode, // the authorizaton code string
            redirect_uri: process.env.REDIRECT_URI, // the callback uri
            grant_type: 'authorization_code'
        },
        headers: {
            Authorization:
                'Basic ' +
                new Buffer(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')
        },
        json: true
    };
}

async function requestTokens(authOptions) {
    let result = await rp.post(authOptions);
    return {
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        expiryIn: result.expires_in
    };
}
export { generateAuthOptions, requestTokens };
