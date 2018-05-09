import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Tokens from '../../../src/client/utilities/tokens';
import * as serverFetch from '../../../src/client/utilities/server-fetch';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('front end - Tokens', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('refresh access token', () => {
        beforeEach(() => {
            sandbox.stub(serverFetch, 'getNewAccessToken').resolves({
                accessToken: 'fake',
                expiryIn: 3600
            });
            const fakeTokens = {
                accessToken: 'fake',
                refreshToken: 'fake'
            };
            sandbox.stub(Tokens, 'updateAccessToken');
            Tokens.refreshAccessToken(fakeTokens);
        });
        describe('outcome - expired token', () => {
            it('should call for a new access token', () => {
                expect(serverFetch.getNewAccessToken).to.be.calledOnce;
            });
            // it('should update the tokens', () => {
            //     expect(Tokens.updateAccessToken).to.be.calledOnce;
            // });
        });
    });
});