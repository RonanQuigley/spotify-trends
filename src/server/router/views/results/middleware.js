import results from './results.hbs';
import {
    requestPersonalData,
    requestAudioFeatures
} from '../../../api/user-data/request-handler';
import processData from '../../../api/user-data/processor';
import { getStatistics } from '../../../api/statistics';

export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export async function getUserData(req, res, next) {
    const token = res.locals.accessToken;
    try {
        const result = await requestPersonalData(token, 50);
        res.locals.data = result;
        return next();
    } catch (error) {
        return next(error);
    }
}

export async function processUserData(req, res, next) {
    const rawData = res.locals.data;
    const token = res.locals.accessToken;
    const processedData = processData(rawData);
    const audioFeatures = await requestAudioFeatures(
        token,
        processedData.tracks
    );
    res.locals.data = {
        userData: processedData,
        audioFeatures: audioFeatures
    };
    return next();
}

export function getAudioStats(req, res, next) {
    res.locals.data.statistics = getStatistics(res.locals.data.audioFeatures);
    return next();
}

export function renderResults(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        /* in dev mode, rather than make requests to ext. servers, 
        slowing down dev efficiency, use data from fixtures as 
        the payload and render that as dummy data to work with */
        const payload = results({
            dev: true,
            data: require('fixtures/spotify/processed-data/payload')
        });
        res.send(payload);
    } else {
        const payload = results({
            dev: process.env.NODE_ENV !== 'production' ? true : false,
            data: {
                statistics: res.locals.data.statistics,
                userData: res.locals.data.userData,
                audioFeatures: res.locals.data.audioFeatures
            }
        });
        res.send(payload);
    }
}

export function errorHandler(err, req, res, next) {
    if (err.statusCode === 401) {
        /* the user's access token has expired.
        redirect back to the main page for a refresh */
        res.redirect('/');
    } else {
        if (process.env.NODE_ENV !== 'test') {
            console.error(err.message);
        }
        res.status(500).send('Internal Server Error');
    }
}
