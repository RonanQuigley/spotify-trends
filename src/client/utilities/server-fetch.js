import 'whatwg-fetch';

export function fetchData(endpoint, header) {
    // we wrap window.fetch in a function for unit testing purposes
    return window.fetch(endpoint, header);
}

export function generateHeader(refreshToken, expiredToken) {
    return {
        method: 'POST',
        body: JSON.stringify({ refreshToken, expiredToken }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    };
}
