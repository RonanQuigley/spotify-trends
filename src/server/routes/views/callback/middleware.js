import { grantType, generateAuthHeader, requestTokens } from '../../../api/';
import { stringify } from 'querystring';
import rp from 'request-promise';

export async function authUser(req, res, next) {
    const token = req.query.code;
    const authOptions = generateAuthHeader(token, grantType.AUTHORIZE);
    try {
        const tokens = await requestTokens(authOptions);
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
