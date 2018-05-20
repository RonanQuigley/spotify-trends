import rp from 'request-promise';
import {
    endpoints,
    timeRanges,
    generatePersonalDataUrl,
    generateAudioFeaturesUrl
} from './url';

import util from 'util';

export function generateOptions(token, url) {
    return {
        url: url,
        headers: { Authorization: 'Bearer ' + token },
        json: true
    };
}

export async function requestPersonalData(token, limit) {
    let results = {};
    for (const endpoint in endpoints) {
        const currentEndpoint = endpoints[endpoint];
        let obj = {};
        for (const timeRange in timeRanges) {
            const currentTimeRange = timeRanges[timeRange];
            const url = generatePersonalDataUrl(
                currentEndpoint,
                currentTimeRange,
                limit
            );
            const options = generateOptions(token, url);
            const result = await rp.get(options);
            obj[timeRange] = result;
        }
        results[currentEndpoint] = obj;
    }
    return results;
}

export async function requestAudioFeatures(token, tracks) {
    let results = {};
    for (const timeRange in tracks) {
        const ids = getSpotifyIDs(tracks[timeRange]);
        const url = generateAudioFeaturesUrl(ids);
        const options = generateOptions(token, url);
        const result = await rp.get(options);
        results[timeRange] = result.audio_features;
    }
    return results;
}

function getSpotifyIDs(arr) {
    return arr.map(obj => obj.id);
}
