export const names = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryIn: 'expiryIn'
};

/* for unit testing we wrap the local storage in an object */

export function setItem(name, value) {
    localStorage.setItem(name, value);
}

export function getItem(name) {
    return localStorage.getItem(name);
}
