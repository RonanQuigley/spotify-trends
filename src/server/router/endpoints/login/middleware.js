import { stringify } from 'query-string';

const env = process.env;

const redirect_uri =
    env.NODE_ENV === 'production' ? env.REDIRECT_URI : env.REDIRECT_URI_DEV;

const urlString = {
    response_type: env.RESPONSE_TYPE, // as in a authorization code
    client_id: env.CLIENT_ID, // application id
    scope: env.SCOPE, // permissions
    redirect_uri: redirect_uri // where spotify should redirect to
};

export function redirectToAuth(req, res, next) {
    // server requests authorization
    res.redirect(
        'https://accounts.spotify.com/authorize?' + stringify(urlString)
    );
}
