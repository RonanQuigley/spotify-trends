import request from 'request-promise-native';

export function generateAuthOptions(authCode) {
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

export async function requestTokens(authOptions) {
    // let response;
    try {
        let res = await request.post(authOptions);
        return {
            accessToken: res.body.access_token,
            refreshToken: res.body.refresh_token,
            expiryIn: res.body.expires_in
        };
    } catch (e) {
        return e;
    }
    // return response;
}

export function fake() {
    console.log('CALLED ANYWAYS');
    return 'foo';
}
