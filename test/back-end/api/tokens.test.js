import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rp from 'request-promise';
import chaiAsPromised from 'chai-as-promised';
import * as Tokens from '../../../src/server/api/authentication/tokens';
import * as Header from '../../../src/server/api/authentication/header';
import { fakeGrantType, fakeTokens } from '../../fixtures/authentication/';
import httpMocks from 'node-mocks-http';
chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();
let response;
let rpStub;

function generateStubs() {
    rpStub = sandbox.stub(rp, 'post');
    rpStub.resolves({
        access_token: fakeTokens.accessToken,
        refresh_token: fakeTokens.refreshToken,
        expires_in: fakeTokens.expiryIn
    });
}

describe('back end - api - tokens', () => {
    beforeEach(async () => {
        generateStubs();
        response = await Tokens.requestTokens();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('request tokens', () => {
        it('should call request.post', () => {
            expect(rp.post).to.be.calledOnce;
        });
        it('should return an object', () => {
            expect(response).to.be.a('object');
        });
        it('should return an access token', () => {
            expect(response.accessToken).to.be.a('string');
        });
        it('should return a refresh token', () => {
            expect(response.refreshToken).to.be.a('string');
        });
        it('should return an expiry', () => {
            expect(response.expiryIn).to.be.a('string');
        });
        it('should return the error in the event of an error', async () => {
            const error = new Error('fake error');
            rpStub.rejects(error);
            await expect(
                Tokens.requestTokens(null)
            ).to.eventually.be.rejectedWith(error);
        });
    });

    describe('refreshing an access token from the server', () => {
        let result;
        let req;
        beforeEach(() => {
            sandbox.spy(Header, 'generateAuthHeader');
            req = httpMocks.createRequest();
            req.body.refreshToken = fakeTokens.refreshToken;
            result = Tokens.refreshAccessToken(req);
        });
        afterEach(() => {
            req.headers = null;
            Tokens.restore();
        });
        it('should generate an auth header', () => {
            expect(Header.generateAuthHeader).to.be.calledWith(
                fakeTokens.refreshToken,
                fakeGrantType.REFRESH
            ).calledOnce;
        });
        it('should return a Promise', () => {
            expect(result).to.be.a('Promise');
        });
        it('should reject gracefully', async () => {
            rpStub.rejects();
            await expect(Tokens.refreshAccessToken(req)).to.be.rejected;
        });
        describe('resolved promise', () => {
            beforeEach(() => {
                rpStub.resolves({
                    access_token: fakeTokens.accessToken,
                    expires_in: fakeTokens.expiryIn
                });
                result = Tokens.refreshAccessToken(req);
            });
            it('should return an object', async () => {
                await expect(result).to.eventually.be.a('object');
            });
            it('should return a new access token', async () => {
                const obj = {
                    accessToken: fakeTokens.accessToken,
                    expiryIn: fakeTokens.expiryIn
                };
                await expect(result).to.eventually.deep.equal(obj);
            });
        });
    });
});
