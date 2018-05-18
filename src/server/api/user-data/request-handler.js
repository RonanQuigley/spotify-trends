import rp from 'request-promise';
import { request } from 'http';

export function _generateOptions(token, url) {
    return {
        url: url,
        headers: { Authorization: 'Bearer ' + token },
        json: true
    };
}

export async function requestData(token, url) {
    const options = _generateOptions(token, url);
    return await rp.get(options);
}
