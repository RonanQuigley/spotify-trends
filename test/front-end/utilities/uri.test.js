import * as uri from '../../../src/client/utilities/uri';

describe('front end - uri', () => {
    describe('get query string element', () => {
        let result;
        beforeEach(() => {
            jest.spyOn(global, 'decodeURIComponent');
            jest
                .spyOn(uri, 'getLocationHref')
                .mockReturnValue(
                    'http://localhost:3000/results?accessToken=fake_access_token&refreshToken=fake_refresh_token&expiryIn=fake_expiry_in'
                );
            result = uri.getQueryStringElement('accessToken');
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should return a string', () => {
            expect(typeof result).toBe('string');
        });
        it('should return an access token', () => {
            expect(result).toBe('fake_access_token');
        });
        it('should return a refresh token', () => {
            result = uri.getQueryStringElement('refreshToken');
            expect(result).toBe('fake_refresh_token');
        });
        it('should return an expiry', () => {
            result = uri.getQueryStringElement('expiryIn');
            expect(result).toBe('fake_expiry_in');
        });
        it('should get location href', () => {
            expect(uri.getLocationHref).toHaveBeenCalledTimes(1);
        });
        it('should call decode uri component', () => {
            expect(decodeURIComponent).toHaveBeenCalledTimes(1);
        });
    });
});
