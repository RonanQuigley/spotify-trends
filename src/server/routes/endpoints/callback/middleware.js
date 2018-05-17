import { requestTokens } from '../../../api/authentication/tokens';
import {
    generateAuthHeader,
    grantType
} from '../../../api/authentication/header';
import { stringify } from 'querystring';
import rp from 'request-promise';

export async function authUser(req, res, next) {
    const token = req.query.code;
    const authOptions = generateAuthHeader(token, grantType.AUTH);
    try {
        const newTokens = await requestTokens(authOptions);
        res.locals.tokens = newTokens;
        return next();
    } catch (error) {
        return next(error);
    }
}

export function redirect(req, res, next) {
    const queryString = {
        accessToken: res.locals.tokens.accessToken,
        refreshToken: res.locals.tokens.refreshToken,
        expiryIn: res.locals.tokens.expiryIn
    };
    res.redirect(302, '/results?' + stringify(queryString));
}
