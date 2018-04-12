import queryString from 'querystring';
import Debug from 'debug';
import request from 'request';
import util from 'util';
import Utilities from '../utilities';
const clientID = process.env.CLIENT_ID; // Your client id
const clientSecret = process.env.CLIENT_SECRET; // Your secret
const port = process.env.PORT;
const debug = Debug('spotifydebug:');

export default class SpotifyApi {
    static redirectURI = 'http://localhost:' + port + '/callback';

    static headerType = {
        LOGIN: 'generate-tokens',
        DATAREQ: 'request-spotify-data',
        REFRESH: 'refresh-access-token'
    };

    static requestType = {
        TRACKS: 'tracks',
        ARTISTS: 'artists'
    };

    static validateAccessToken(accessToken, cb) {
        // create a dummy request to test if our access token is still valid
        let dummyRequestURL =
            'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF';
        let authHeader = this.generateAuthHeader(
            this.headerType.DATAREQ,
            null,
            dummyRequestURL,
            accessToken
        );
        request.get(authHeader, (err, res, body) => {
            cb(res.statusCode);
        });
    }

    static requestTokens(authOptions, callback) {
        request.post(authOptions, (err, res, body) => {
            let result = Utilities.validateReqCallback(err, res, body);
            if (result !== true) throw result;
            let accessToken = body.access_token;
            if (!accessToken) throw 'no access token';
            let refreshToken = body.refresh_token;
            if (!refreshToken) throw 'no refresh token';
            let expiryIn = body.expires_in;
            if (!expiryIn) throw 'no expires in time';
            callback({
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiryIn: expiryIn
            });
        });
    }

    static refreshAccessToken(authOptions, callback) {
        request.post(authOptions, (err, res, body) => {
            let result = Utilities.validateReqCallback(err, res, body);
            if (result !== true) throw result;
            let accessToken = body.access_token;
            if (!accessToken) throw 'no access token';
            let expiryIn = body.expires_in;
            if (!expiryIn) throw 'no expires in time';
            callback(accessToken, expiryIn);
        });
    }

    static generateAuthHeader(headerType, authCode, url, token) {
        if (typeof headerType !== 'string')
            throw 'header type is wrong; did you pass the object by mistake?';
        switch (headerType) {
            case this.headerType.DATAREQ:
                return {
                    url: url,
                    headers: { Authorization: 'Bearer ' + token },
                    json: true
                };
            case this.headerType.REFRESH:
                return {
                    url: 'https://accounts.spotify.com/api/token',
                    headers: {
                        Authorization:
                            'Basic ' +
                            new Buffer(clientID + ':' + clientSecret).toString(
                                'base64'
                            )
                    },
                    form: {
                        grant_type: 'refresh_token',
                        refresh_token: token
                    },
                    json: true
                };
            case this.headerType.LOGIN:
                return {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                        code: authCode, // the authorizaton code string
                        redirect_uri: this.redirectURI, // the callback uri
                        grant_type: 'authorization_code'
                    },
                    headers: {
                        Authorization:
                            'Basic ' +
                            new Buffer(clientID + ':' + clientSecret).toString(
                                'base64'
                            )
                    },
                    json: true
                };
        }
    }

    static generateQueryString(time, limit, offset) {
        if (!time) time = timeRange.SHORT;
        if (!limit) limit = 20;
        // can't use not with 0; would evaluate to true
        if (offset === undefined) offset = 0;
        return queryString.stringify({
            time_range: time,
            limit: limit,
            offset: offset
        });
    }

    static getPersonalStats(accessToken, limit, offset, requestType, callback) {
        let storedResultsObj = new Results();
        let cb = onRequestCompleted.bind(callback, storedResultsObj);
        personalStatsReq.call(
            this,
            accessToken,
            limit,
            offset,
            cb,
            requestType
        );
    }

    static getAudioFeatures(accessToken, topTracks, callback) {
        // TO DO: REFACTOR AS THIS FUNCTION SHOULDN'T BE ACCESSABLE OUTSIDE OF THE MODULE.
        // ISSUE: EXECUTION CONTEXT BINDING; TRACKS AND A REFERENCE TO THE SPOTIFYAPI CLASS
        // BOTH NEED TO BE PASSED AROUND WITH THE CURRENT IMPLEMENTATION.

        let results = {};
        let maxResults = 3;
        let resultsCount = 0;
        let cb = function(results, prop, tracksFeatures) {
            debug(tracksFeatures);
            // pass the current property name and assign it the audio track features values
            // otherwise, once we're done, pass the results back to the callback
            results[prop.valueOf()] = tracksFeatures;
            if (++resultsCount >= maxResults) callback(results);
        }.bind(callback, results);
        // process all time, six months and four week periods
        for (let tracks in topTracks) {
            let ids = getSpotifyIDs(topTracks[tracks]);
            let url = 'https://api.spotify.com/v1/audio-features?ids=' + ids;
            let header = this.generateAuthHeader(
                this.headerType.DATAREQ,
                null,
                url,
                accessToken
            );
            request.get(header, (err, res, body) => {
                let result = Utilities.validateReqCallback(err, res, body);
                if (result !== true) throw result;
                cb(tracks, body.audio_features);
            });
        }
    }
}

class Results {
    constructor() {
        this.fourWeeks = null;
        this.sixMonths = null;
        this.allTime = null;
    }
}

const timeRange = {
    SHORT: 'short_term', // last 4 weeks
    MEDIUM: 'medium_term', // approx last 6 months
    LONG: 'long_term' // several years of data
};

function onRequestCompleted(storedResultsObj, timeRange, body) {
    let spotifyResults = body;
    storeResults(body, storedResultsObj, timeRange);
    if (
        storedResultsObj.allTime &&
        storedResultsObj.sixMonths &&
        storedResultsObj.fourWeeks
    ) {
        // send the results back up to the executing context callback function
        // it will either be results of topArtists or topTracks
        let sendResultsCallback = this;
        sendResultsCallback(storedResultsObj);
    }
}

function personalStatsReq(
    accessToken,
    limit,
    offset,
    callback,
    requestType,
    url
) {
    if (!requestType) throw 'endpoint type is undefined';
    let timeRangeValues = Object.values(timeRange);
    let createRequest = function(i) {
        let currentTimeRange = timeRangeValues[i];
        let queryString =
            '?' + this.generateQueryString(currentTimeRange, limit, offset);
        let url =
            'https://api.spotify.com/v1/me/top/' +
            requestType +
            '' +
            queryString;
        let header = this.generateAuthHeader(
            this.headerType.DATAREQ,
            null,
            url,
            accessToken
        );
        debug('finalised header: ' + header.headers);
        request.get(header, (err, res, body) => {
            // let result = Utilities.validateReqCallback(err, res, body);
            callback(currentTimeRange, body.items);
        });
    };
    for (let i = 0; i <= 2; i++) {
        createRequest.call(this, i);
    }
}

function storeResults(currentResult, resultsObj, time) {
    switch (time) {
        case timeRange.SHORT:
            resultsObj.fourWeeks = currentResult;
            break;
        case timeRange.MEDIUM:
            resultsObj.sixMonths = currentResult;
            break;
        case timeRange.LONG:
            resultsObj.allTime = currentResult;
            break;
    }
}

function getSpotifyIDs(obj) {
    return Object.keys(obj).map(key => {
        return obj[key].id;
    });
}
