import results from './results.hbs';
import { requestData } from '../../../api/user-data/request-handler';
import { processData } from '../../../api/user-data/processor';

export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export async function getUserData(req, res, next) {
    const token = res.locals.accessToken;
    try {
        const result = await requestData(token, 50);
        res.locals.data = result;
        return next();
    } catch (error) {
        console.log(error.statusCode);
        return next(error);
    }
}

export function processUserData(req, res, next) {
    const userData = res.locals.data;
    processData(userData);
    next();
}

export function renderResults(req, res, next) {
    res.send(
        results({
            dev: process.env.NODE_ENV === 'development' ? true : false
        })
    );
}

export function errorHandler(err, req, res, next) {
    if (err.statusCode === 401) {
        /* the user's access token has expired.
        redirect back to the main page for a refresh */
        res.redirect('/');
    } else {
        res.status(500).send('Internal Server Error');
    }
}
