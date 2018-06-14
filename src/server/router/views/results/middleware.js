// import results from './results.hbs';
import { headerID, styleID } from 'src/server/api/react/utilities';
import serverSideRender from 'src/server/api/react/render';
import { setupProps } from 'src/server/api/react/utilities';
import processData from 'src/server/api/user-data/processor';
import { getStatistics } from 'src/server/api/statistics';
import {
    requestPersonalData,
    requestAudioFeatures
} from 'src/server/api/user-data/request-handler';
import React from 'react';
import { SheetsRegistry } from 'react-jss/lib/jss';
import App from 'common/react/apps/results';
import { default as fakeData } from 'fixtures/spotify/processed-data/small-payload';
import Theme from 'common/react/common/theme/results';

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
    // const fakeData = require('fixtures/spotify/processed-data/small-payload')
    //     .default;
    res.locals.data = {
        userData: {
            artists: fakeData.artists,
            tracks: fakeData.tracks
        },
        statistics: fakeData.statistics
    };
    return next();
}

export function setupReactProps(req, res, next) {
    /* TO DO : USE LOOP CONSTRUCT FOR THIS */

    const artists = setupProps(
        res.locals.data.userData.artists,
        styleID.ARTISTS,
        headerID.ARTISTS
    );

    const tracks = setupProps(
        res.locals.data.userData.tracks,
        styleID.TRACKS,
        headerID.TRACKS
    );

    const mode = setupProps(
        res.locals.data.statistics.tally.mode,
        styleID.MODE,
        headerID.MODE
    );

    const key = setupProps(
        res.locals.data.statistics.tally.key,
        styleID.KEY,
        headerID.KEY
    );

    const average = setupProps(
        res.locals.data.statistics.average,
        styleID.AVERAGE,
        headerID.AVERAGE
    );

    res.locals.data.react = {
        props: {
            artists: artists,
            tracks: tracks,
            mode: mode,
            key: key,
            average: average
        }
    };

    return next();
}

export function generateReactApps(req, res, next) {
    // get out react props
    const props = res.locals.data.react.props;

    const app = <App childProps={props} />;

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Render the apps to a string.
    const html = serverSideRender(app, sheetsRegistry, Theme);

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();

    res.locals.data.react.apps = {
        html: html,
        css: css
    };

    return next();
}

export function renderResults(req, res, next) {
    const html = res.locals.data.react.apps.html;
    const css = res.locals.data.react.apps.css;
    const props = JSON.stringify(res.locals.data.react.props);
    const env = process.env.NODE_ENV;
    const dev = env === 'development' ? `<script src="/dev.js"></script>` : ``;
    // remember to remove unused font sizes
    const font =
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Roboto+Mono:100,200,300';
    const pageTitle = 'Results';

    const payload = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${pageTitle}</title>
            <link rel="stylesheet" href=${font}>
            <style id="jss-server-side">${css}</style>

            <!-- initial props must be set first --> 
            <script id="props">window.__initial__props__ = ${props}</script>
            <!-- call the results js last --> 
            <script src="/results.js"></script>
        </head>
        <body>
            <div id="root">${html}</div>
            ${dev}
        </body>
    </html>`;

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
