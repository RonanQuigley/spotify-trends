import { stringify } from 'query-string';

const urlString = stringify({
    response_type: process.env.RESPONSE_TYPE, // as in a authorization code
    client_id: process.env.CLIENT_ID, // application id
    scope: process.env.SCOPE, // permissions
    redirect_uri: process.env.REDIRECT_URI // where spotify should redirect to
});

function redirectUser(req, res, next) {
    // server requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' + urlString);
}

export { redirectUser };
