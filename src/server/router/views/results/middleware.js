import results from './results.hbs';
import { requestData } from '../../../api/user-data/request-handler';

export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export async function getUserData(req, res, next) {
    const token = res.locals.accessToken;
    try {
        const result = await requestData(token);
        res.locals.data = result;
        return next();
    } catch (error) {
        return next(error);
    }
}

export function processUserData(req, res, next) {
    const userData = res.locals.data;
    next();
}

export function renderResults(req, res, next) {
    res.send(
        results({
            dev: process.env.NODE_ENV === 'development' ? true : false
        })
    );
}

export function handleExpiredRejection(error, req, res, next) {
    res.send(error.toString());
}
