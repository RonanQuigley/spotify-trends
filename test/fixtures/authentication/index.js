/*
    Don't import code from either the front-end or back-end.
    Fixtures should be entirely self-contained.
*/

export const fakeTokens = {
    accessToken: 'fakeAccessToken',
    refreshToken: 'fakeRefreshToken',
    expiryIn: 3600
};

export const fakeGrantType = {
    AUTH: 'authorization_code',
    REFRESH: 'refresh_token'
};

export const fakeTokenNames = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryIn: 'expiryIn'
};

export const fakeUrl =
    `http://localhost:3000/results?` +
    `accessToken=${fakeTokens.accessToken}` +
    `&refreshToken=${fakeTokens.refreshToken}` +
    `&expiryIn=${fakeTokens.expiryIn}`;
