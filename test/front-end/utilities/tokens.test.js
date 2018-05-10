import * as Tokens from '../../../src/client/utilities/tokens';
import * as serverFetch from '../../../src/client/utilities/server-fetch';

describe('front end - Tokens', () => {
    describe('refresh access token', () => {
        beforeEach(() => {
            const fakeTokens = {
                accessToken: 'fake',
                refreshToken: 'fake'
            };
            jest.spyOn(serverFetch, 'getNewAccessToken').mockResolvedValue({
                accessToken: 'fake',
                expiryIn: 3600
            });
            jest.spyOn(Tokens, 'updateAccessToken');
            Tokens.refreshAccessToken(fakeTokens);
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
        describe('outcome - expired token', () => {
            it('should call for a new access token', () => {
                expect(serverFetch.getNewAccessToken).toHaveBeenCalledTimes(1);
            });
            // it('should update the tokens', () => {
            //     expect(Tokens.updateAccessToken).to.be.calledOnce;
            // });
        });
    });
});
