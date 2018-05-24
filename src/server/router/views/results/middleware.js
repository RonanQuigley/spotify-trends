import results from './results.hbs';
import {
    requestPersonalData,
    requestAudioFeatures
} from '../../../api/user-data/request-handler';
import processData from '../../../api/user-data/processor';
import { getStatistics } from '../../../api/statistics';
import { renderReactApp } from '../../../api/react';

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

export function setupDevelopmentAssets(req, res, next) {
    /* if we're in development mode, the res.locals.data will
        not have been set up. we need to check for this. We also use dummy
        data to speed up dev so we're not continuosly making spotify server requests
    */
    const fakeData = require('fixtures/spotify/processed-data/payload').default;
    res.locals.data = {
        userData: {
            artists: fakeData.artists,
            tracks: fakeData.tracks
        }
    };
    return next();
}

export function renderReactAssets(req, res, next) {
    res.locals.data.react = {
        artists: renderReactApp(res.locals.data.userData.artists),
        tracks: renderReactApp(res.locals.data.userData.tracks)
    };
    return next();
}

export function renderResults(req, res, next) {
    const payload = results({
        dev: process.env.NODE_ENV !== 'production' ? true : false,
        data: {
            // averaged and mean data
            statistics: res.locals.data.statistics,
            // top tracks
            tracks: res.locals.data.userData.tracks,
            // top artists
            artists: res.locals.data.userData.artists,
            // react apps
            react: res.locals.data.userData.react
        }
    });
    res.send(payload);
    return next();
}

export function errorHandler(err, req, res, next) {
    if (err.statusCode === 401) {
        /* the user's access token has expired.
        redirect back to the main page for a refresh */
        res.redirect('/');
    } else {
        if (process.env.NODE_ENV !== 'test') {
            console.error(err.stack);
        }
        res.status(500).send('Internal Server Error');
    }
}
