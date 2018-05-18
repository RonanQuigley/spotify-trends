import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { fakeTokens } from '../../fixtures/authentication/';
import * as Tokens from '../../../src/client/utilities/tokens';
import * as User from '../../../src/client/utilities/user';
import * as Url from '../../../src/client/utilities/url';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('front end - user', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('is an existing user', () => {
        let result;
        let getTokenStub;
        beforeEach(() => {
            getTokenStub = sandbox.stub(Tokens, 'getRefreshToken');
        });
        describe('outcome - true', () => {
            beforeEach(() => {
                getTokenStub.returns('a fake token');
                result = User.isExistingUser();
            });
            it('should call get token', () => {
                expect(Tokens.getRefreshToken).to.be.calledOnce;
            });
            it('should return true if a token exists', () => {
                expect(result).to.be.true;
            });
        });
        describe('outcome - false', () => {
            beforeEach(() => {
                getTokenStub.returns(null);
                result = User.isExistingUser();
            });
            it("should return false if an access token doesn't exist", () => {
                expect(result).to.be.false;
            });
        });
    });
    describe('process user', () => {
        let isAccessTokenValidStub;
        beforeEach(() => {
            isAccessTokenValidStub = sandbox.stub(Tokens, 'isAccessTokenValid');
            sandbox
                .stub(Tokens, 'getAccessToken')
                .returns(fakeTokens.accessToken);
            sandbox.stub(Url, 'redirect');
        });
        describe('outcome - redirect', () => {
            beforeEach(async () => {
                isAccessTokenValidStub.returns(true);
                await User.processUser();
            });
            it('should check if the access token is valid', () => {
                expect(Tokens.isAccessTokenValid).to.be.calledOnce;
            });
            it('should call redirect if a valid access token exists', () => {
                expect(Url.redirect).to.be.calledWith(
                    '/results',
                    fakeTokens.accessToken
                ).calledOnce;
            });
        });
        describe('outcome - refresh then redirect', () => {
            beforeEach(async () => {
                isAccessTokenValidStub.returns(null);
                sandbox
                    .stub(Tokens, 'getRefreshToken')
                    .returns(fakeTokens.refreshToken);
                sandbox.stub(Tokens, 'refreshAccessToken').resolves({
                    accessToken: fakeTokens.accessToken,
                    expiryIn: fakeTokens.expiryIn
                });
                sandbox.stub(Tokens, 'updateAccessAndExpiryTokens');
                await User.processUser();
            });
            it('should get the access (expired) and refresh tokens', () => {
                expect(Tokens.getRefreshToken).to.be.calledOnce;
            });
            it('should pass the tokens for refreshing', () => {
                expect(Tokens.refreshAccessToken).to.be.calledOnce;
            });
            it('should update the access tokens', () => {
                expect(Tokens.updateAccessAndExpiryTokens).to.be.calledWith(
                    fakeTokens.accessToken,
                    fakeTokens.expiryIn
                ).calledOnce;
            });
            it('should redirect the user', () => {
                expect(Url.redirect).to.be.calledWith(
                    '/results',
                    fakeTokens.accessToken
                ).calledOnce;
            });
        });
    });
});
