// keep our unit tests consistent with our chosen token naming convention
import { names } from '../../src/client/utilities/tokens';

export const fakeTokens = {
    accessToken: 'fakeAccessToken',
    refreshToken: 'fakeRefreshToken',
    expiryIn: 'fakeExpiryIn'
};

export const fakeTokenNames = {
    accessToken: names.accessToken,
    refreshToken: names.refreshToken,
    expiryIn: names.expiryIn
};

export const fakeUrl =
    `http://localhost:3000/results?` +
    `accessToken=${fakeTokens.accessToken}` +
    `&refreshToken=${fakeTokens.refreshToken}` +
    `&expiryIn=${fakeTokens.expiryIn}`;
