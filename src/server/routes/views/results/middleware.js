import results from './results.hbs';

export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export function getUserData(req, res, next) {
    return next();
}

export function renderResults(req, res, next) {
    res.send(
        results({
            dev: process.env.NODE_ENV === 'development' ? true : false
        })
    );
}
