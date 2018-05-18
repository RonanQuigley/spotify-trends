import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { fakeTokens, fakeTokenNames } from '../../fixtures/authentication/';
import * as Uri from '../../../src/client/utilities/uri';
import * as Tokens from '../../../src/client/utilities/tokens';
import * as localStorage from '../../../src/client/utilities/local-storage';
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
            it('should update the tokens that are in local storage', () => {
                expect(Tokens.updateAccessAndExpiryTokens).to.be.calledWith(
                    fakeTokens.accessToken,
                    fakeTokens.expiryIn
                ).calledOnce;
            });
        });
    });

    describe('getting a new access token', () => {
        let result;
        let responseSpy;
        beforeEach(async () => {
            const obj = {
                accessToken: fakeTokens.accessToken,
                expiryIn: fakeTokens.expiryIn
            };
            responseSpy = sandbox.spy(async () => obj);
            const fakeResponse = {
                json: responseSpy
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
        it('should return a new accessToken', () => {
            expect(result.accessToken).to.be.a('string');
        });
        it('should return a new expiry', () => {
            expect(result.expiryIn).to.be.a('number');
        });
        it('should call response json', () => {
            expect(responseSpy).to.be.calledOnce;
        });

        describe('setting access token expiry', () => {
            let result;
            beforeEach(() => {
                sandbox.stub(localStorage, 'setItem');
                result = Tokens.setAccessTokenExpiry(fakeTokens.expiryIn);
            });
            it('should set the correct item in local storage', () => {
                expect(localStorage.setItem).to.be.calledOnce;
            });
        });
    });
});
