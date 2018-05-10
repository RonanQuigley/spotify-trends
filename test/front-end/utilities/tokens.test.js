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
        let stub;
        beforeEach(() => {
            stub = sandbox.stub(serverFetch, 'foo');
            const fakeTokens = {
                accessToken: 'fake',
                refreshToken: 'fake'
            };
            sandbox.stub(Tokens, 'updateAccessToken');
            Tokens.refreshAccessToken(fakeTokens);
        });
        describe('outcome - expired token', () => {
            it('should call for a new access token', () => {
                expect(stub).to.be.calledOnce;
            });
        });
    });
});
