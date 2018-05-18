import results from './results.hbs';
import * as UserData from '../../../api/user-data';

export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export async function getUserData(req, res, next) {
    const token = res.locals.accessToken;
    const url =
        'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=1&offset=0';
    try {
        const result = await UserData.requestData(token, url);
        res.locals.userData = result;
        return next();
    } catch (error) {
        return next(error);
    }
}

export function renderResults(req, res, next) {
    res.send(
        results({
            dev: process.env.NODE_ENV === 'development' ? true : false
        })
    );
}

export function handleExpiredRejection(error, req, res, next) {
    console.error(error);
    res.redirect('/');
}
