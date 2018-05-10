import * as Token from '../../../src/client/utilities/tokens';
import * as User from '../../../src/client/utilities/user';
import 'whatwg-fetch';

describe('front end - user', () => {
    describe('redirect user', () => {
        it('should call window.location.assign', () => {
            jest.spyOn(window.location, 'assign').mockImplementation(() => {});
            User.redirectUser();
            expect(window.location.assign).toHaveBeenCalledTimes(1);
        });
    });
    describe('is an existing user', () => {
        let result;
        let spy;
        beforeEach(() => {
            spy = jest.spyOn(Token, 'getToken');
        });
        describe('outcome - true', () => {
            beforeEach(() => {
                spy.mockReturnValue('fake');
                result = User.isExistingUser();
            });
            it('should call get token', () => {
                expect(Token.getToken).toHaveBeenCalledTimes(1);
            });
            it('should return true if a token exists', () => {
                expect(result).toBe(true);
            });
        });
        describe('outcome - false', () => {
            beforeEach(() => {
                spy.mockReturnValue(null);
                result = User.isExistingUser();
            });
            it("should return false if an access token doesn't exist", () => {
                expect(result).toBe(false);
            });
        });
    });
    describe('process user', () => {
        let validAccessSpy;
        let redirectSpy;
        beforeEach(() => {
            validAccessSpy = jest.spyOn(Token, 'getValidAccessToken');
            jest.spyOn(Token, 'refreshAccessToken');
        });
        describe('outcome - redirect', () => {
            beforeEach(() => {
                validAccessSpy.mockReturnValue('fake');
                redirectSpy = jest.spyOn(User, 'redirectUser');
                User.processUser();
            });
            it('should get valid tokens', () => {
                expect(Token.getValidAccessToken).toHaveBeenCalledTimes(1);
            });
            it('should call redirect if a valid access token exists', () => {
                expect(User.redirectUser).toHaveBeenCalledTimes(1);
            });
        });
        // describe('outcome - refresh', () => {
        //     beforeEach(() => {
        //         validAccessSpy.mockReturnValue(null);
        //         jest.spyOn(Token, 'getAccessAndRefreshTokens').mockReturnValue({
        //             accessToken: 'fake',
        //             refreshToken: 'fake'
        //         });
        //         User.processUser();
        //     });
        //     it('should get the access (expired) and refresh tokens', () => {
        //         expect(Token.getAccessAndRefreshTokens).toHaveBeenCalledTimes(1);
        //     });
        //     it('should pass the tokens for refreshing', () => {
        //         expect(Token.refreshAccessToken).toHaveBeenCalledTimes(1);
        //     });
        // });
    });
});
