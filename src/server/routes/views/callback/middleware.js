import * as api from '../../../api/';
import { stringify } from 'querystring';
import rp from 'request-promise';

async function authUser(req, res, next) {
    let authCode = req.query.code;
    let authOptions = api.generateAuthOptions(authCode);
    api
        .requestTokens(authOptions)
        .then(tokens => {
            res.locals.tokens = tokens;
            next();
        })
        .catch(next);
}

// must be placed last in code
function redirect(req, res, next) {
    let qs = stringify({
        accessToken: res.locals.tokens.accessToken,
        refreshToken: res.locals.tokens.refreshToken,
        expiryIn: res.locals.tokens.expiryIn
    });

    res.redirect(302, '/results?' + qs);
}

export { authUser, redirect };
