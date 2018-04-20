import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Token from '../../../src/client/utilities/tokens';
import * as Identity from '../../../src/client/utilities/user';
import 'whatwg-fetch';
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('front end - user', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('redirect user', () => {
        it('should call window.location.assign', () => {
            sandbox.stub(window.location, 'assign');
            Identity.redirectUser();
            expect(window.location.assign).to.be.calledOnce;
        });
    });
    describe('is an existing user', () => {
        let result;
        let stub;
        beforeEach(() => {
            stub = sandbox.stub(Token, 'getToken');
        });
        describe('outcome - true', () => {
            beforeEach(() => {
                stub.returns('fake');
                result = Identity.isExistingUser();
            });
            it('should call get token', () => {
                expect(Token.getToken).to.be.calledOnce;
            });
            it('should return true if a token exists', () => {
                expect(result).to.be.true;
            });
        });
        describe('outcome - false', () => {
            beforeEach(() => {
                stub.returns(null);
                result = Identity.isExistingUser();
            });
            it("should return false if an access token doesn't exist", () => {
                expect(result).to.be.false;
            });
        });
    });
    describe('process user', () => {
        let validAccessStub;
        beforeEach(() => {
            validAccessStub = sandbox.stub(Token, 'getValidAccessToken');
            sandbox.stub(Identity, 'redirectUser');
            sandbox.stub(Token, 'refreshAccessToken');
        });
        describe('outcome - redirect', () => {
            beforeEach(() => {
                validAccessStub.returns('fake');
                Identity.processUser();
            });
            it('should get valid tokens', () => {
                expect(Token.getValidAccessToken).to.be.calledOnce;
            });
            it('should call redirect if a valid access token exists', () => {
                expect(Identity.redirectUser).to.be.calledOnce;
            });
        });
        describe('outcome - refresh', () => {
            beforeEach(() => {
                validAccessStub.returns(null);
                sandbox.stub(Token, 'getAccessAndRefreshTokens').returns({
                    accessToken: 'fake',
                    refreshToken: 'fake'
                });
                Identity.processUser();
            });
            it('should get the access (expired) and refresh tokens', () => {
                expect(Token.getAccessAndRefreshTokens).to.be.calledOnce;
            });
            it('should pass the tokens for refreshing', () => {
                expect(Token.refreshAccessToken).to.be.calledOnce;
            });
        });
    });
});
