import * as api from '../../../api/';
import { stringify } from 'querystring';
import rp from 'request-promise';

export async function authUser(req, res, next) {
    const authCode = req.query.code;
    const authOptions = api.generateAuthOptions(authCode);
    try {
        const tokens = await api.requestTokens(authOptions);
        res.locals.tokens = tokens;
        next();
    } catch (error) {
        next(error);
    }
}

export function redirect(req, res, next) {
    const qs = stringify({
        accessToken: res.locals.tokens.accessToken,
        refreshToken: res.locals.tokens.refreshToken,
        expiryIn: res.locals.tokens.expiryIn
    });

    res.redirect(302, '/results?' + qs);
}
