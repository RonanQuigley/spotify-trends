import * as api from '../../../api/';
import { stringify } from 'querystring';

export async function authUser(req, res, next) {
    let authCode = req.query.code;
    let authOptions = api.generateAuthOptions(authCode);
    res.locals.tokens = await api.requestTokens(authOptions);
    next();
}

// must be placed last in code
export function redirect(req, res, next) {
    let qs = stringify({
        accessToken: res.locals.tokens.accessToken,
        refreshToken: res.locals.tokens.refreshToken,
        expiryIn: res.locals.tokens.expiryIn
    });
    res.redirect(302, '/results?' + qs);
}
