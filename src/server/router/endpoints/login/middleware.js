import { stringify } from 'query-string';
import { getRedirectURI } from 'src/server/api/authentication/utilities';

const urlString = {
    response_type: process.env.RESPONSE_TYPE, // as in a authorization code
    client_id: process.env.CLIENT_ID, // application id
    scope: process.env.SCOPE, // permissions
    redirect_uri: getRedirectURI() // where spotify should redirect to
};

export function redirectToAuth(req, res, next) {
    // server requests authorization
    res.redirect(
        'https://accounts.spotify.com/authorize?' + stringify(urlString)
    );
}
