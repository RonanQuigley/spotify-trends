import 'whatwg-fetch';

export function fetchData(endpoint, body) {
    // we wrap window.fetch in a function for unit testing purposes
    return window.fetch(endpoint, body);
}

export function generateHeader(refreshToken, expiredToken) {
    return {
        headers: {
            refreshToken: refreshToken,
            accessToken: expiredToken
        },
        json: true
    };
}
