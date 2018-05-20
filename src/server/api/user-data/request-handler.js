import rp from 'request-promise';
import { endpoints, timeRanges, generateUrl } from './url';

export function _generateOptions(token, url) {
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
            const url = generateUrl(currentEndpoint, currentTimeRange, limit);
            const options = _generateOptions(token, url);
            const result = await rp.get(options);
            obj[timeRange] = result;
        }
        results[currentEndpoint] = obj;
    }
    return results;
}

export async function requestAudioFeatures(token, tracks) {}
