import 'whatwg-fetch';

export function fetchData(endpoint, header) {
    // we wrap window.fetch in a function for unit testing purposes
    return window.fetch(endpoint, header);
}

export function generateHeader(refreshToken) {
    return {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    };
}
