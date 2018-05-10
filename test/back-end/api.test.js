import rp from 'request-promise';
import * as api from '../../src/server/api';

describe('api', () => {

    let response;
    let rpSpy;

    beforeEach(async () => {
        rpSpy = jest.spyOn(rp, 'post');
        rpSpy.mockResolvedValue({
            access_token: 'stub',
            refresh_token: 'stub',
            expires_in: 'stub'
        });
        response = await api.requestTokens();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('request tokens', () => {
        it('should call request.post', () => {
            expect(rp.post).toHaveBeenCalledTimes(1);
        });
        it('should return an object', () => {
            expect(typeof response).toBe('object');
        });
        it('should return an access token', () => {
            expect(typeof response.accessToken).toBe('string');
        });
        it('should return a refresh token', () => {
            expect(typeof response.refreshToken).toBe('string');
        });
        it('should return an expiry', () => {
            expect(typeof response.expiryIn).toBe('string');
        });
        it('should be able to be rejected', async () => {
            rpSpy.mockRejectedValue(null);
            await expect(api.requestTokens(null)).rejects;
        });
    });

    describe('authorisation options', () => {
        let result;
        beforeEach(() => {
            result = api.generateAuthOptions(null);
        });
        it('should return an object', () => {
            expect(typeof result).toBe('object');
        });
        it('should contain a token api uri', () => {
            expect(result.url).toBe('https://accounts.spotify.com/api/token');
        });
        it('should contain a form object', () => {
            expect(typeof result.form).toBe('object');
        });
        it('should have the correct grant type', () => {
            expect(result.form.grant_type).toBe('authorization_code');
        });
        it('should contain a header object', () => {
            expect(typeof result.headers).toBe('object');
        });
        it('should contain an authorization', () => {
            expect(typeof result.headers.Authorization).toBe('string');
        });
        it('should return json', () => {
            expect(result.json).toBe(true);
        });
    });
});
