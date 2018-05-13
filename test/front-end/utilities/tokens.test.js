import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Tokens from '../../../src/client/utilities/tokens';
import {
    rewire$getNewAccessToken,
    rewire$updateAccessToken,
    restore
} from '../../../src/client/utilities/tokens';
import * as serverFetch from '../../../src/client/utilities/server-fetch';
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('front end - Tokens', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('refresh access token', () => {
        beforeEach(() => {
            const fakeTokens = {
                accessToken: 'fake',
                refreshToken: 'fake'
            };
            const getNewAccessTokenStub = sandbox.stub().resolves({
                accessToken: 'fake',
                expiryIn: 3600
            });
            const updateAccessTokenStub = sandbox.stub();
            rewire$getNewAccessToken(getNewAccessTokenStub);
            rewire$updateAccessToken(updateAccessTokenStub);
            Tokens.refreshAccessToken(fakeTokens);
        });
        afterEach(() => {
            restore();
        });
        describe('outcome - expired token', () => {
            it('should call for a new access token', () => {
                expect(Tokens.getNewAccessToken).to.be.calledOnce;
            });
            it('should update the access token that is in local storage', () => {
                expect(Tokens.updateAccessToken).to.be.calledOnce;
            });
        });
    });

    describe('getting a new access token', () => {
        let result;
        beforeEach(async () => {
            sandbox.stub(serverFetch, 'generateHeader').returns({});
            sandbox.stub(serverFetch, 'fetchData').resolves({
                accessToken: 'fake',
                expiryIn: 'fake'
            });
            result = await Tokens.getNewAccessToken('refresh', {});
        });
        it('should fetch for the data', () => {
            expect(serverFetch.fetchData).to.be.calledOnce;
        });
        it('should generate a header', () => {
            expect(serverFetch.generateHeader).to.be.calledOnce;
        });
        it('should return an accessToken', () => {
            expect(result.accessToken).to.be.a('string');
        });
        it('should return a refreshToken', () => {
            expect(result.refreshToken).to.be.a('string');
        });
    });
});
