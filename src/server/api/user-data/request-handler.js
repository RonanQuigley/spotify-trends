import rp from 'request-promise';
import { endpoints, timeRanges, generateUrl } from './url';

export function _generateOptions(token, url) {
    return {
        url: url,
        headers: { Authorization: 'Bearer ' + token },
        json: true
    };
}

export async function requestData(token) {
    let results = {};
    for (const endpoint in endpoints) {
        const currentEndpoint = endpoints[endpoint];
        let obj = {};
        for (const timeRange in timeRanges) {
            const currentTimeRange = timeRanges[timeRange];
            const url = generateUrl(currentEndpoint, currentTimeRange);
            const options = _generateOptions(token, url);
            const result = await rp.get(options);
            obj[timeRange] = result;
        }
        results[currentEndpoint] = obj;
    }
    return results;

    // let results = {};
    // for (const endpoint in endpoints) {
    //     const currentEndpoint = endpoints[endpoint];
    //     for (const timeRange in timeRanges) {
    //         const currentTimeRange = timeRanges[timeRange];
    //         const url = generateUrl(currentEndpoint, currentTimeRange);
    //         const options = _generateOptions(token, url);
    //         const result = await rp.get(options);
    //         test.push(result);
    //     }
    // }
    // return results;
}
