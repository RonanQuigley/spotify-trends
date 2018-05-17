import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { fakeTokens } from '../../fixtures';
import * as Uri from '../../../src/client/utilities/uri';
import * as Tokens from '../../../src/client/utilities/tokens';
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
            const getNewAccessTokenStub = sandbox.stub().resolves({
                accessToken: fakeTokens.accessToken,
                expiryIn: fakeTokens.expiryIn
            });
            Tokens.rewire$getNewAccessToken(getNewAccessTokenStub);
            Tokens.rewire$updateAccessAndExpiryTokens(sandbox.stub());
            Tokens.refreshAccessToken({
                accessToken: fakeTokens.accessToken,
                refreshToken: fakeTokens.refreshToken
            });
        });
        afterEach(() => {
            Tokens.restore();
        });
        describe('outcome - expired token', () => {
            it('should call for a new access token', () => {
                expect(Tokens.getNewAccessToken).to.be.calledWith(
                    fakeTokens.refreshToken,
                    fakeTokens.accessToken
                ).calledOnce;
            });
            it('should update the access token that is in local storage', () => {
                expect(Tokens.updateAccessAndExpiryTokens).to.be.calledWith(
                    fakeTokens.accessToken,
                    fakeTokens.expiryIn
                ).calledOnce;
            });
        });
    });

    describe('getting a new access token', () => {
        let result;
        beforeEach(async () => {
            const obj = {
                accessToken: fakeTokens.accessToken,
                expiryIn: fakeTokens.expiryIn
            };
            const fakeResponse = {
                json: sandbox.spy(() => obj)
            };
            sandbox.stub(serverFetch, 'generateHeader').returns({});
            sandbox.stub(serverFetch, 'fetchData').resolves(fakeResponse);
            result = await Tokens.getNewAccessToken(
                fakeTokens.refreshToken,
                {}
            );
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
