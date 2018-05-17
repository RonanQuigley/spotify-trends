import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rp from 'request-promise';
import chaiAsPromised from 'chai-as-promised';
import * as api from '../../src/server/api';
import { fakeGrantType, fakeTokens } from '../fixtures';
import httpMocks from 'node-mocks-http';
chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();
let response;
let postStub;

function generateStubs() {
    postStub = sandbox.stub(rp, 'post');
    postStub.resolves({
        access_token: fakeTokens.accessToken,
        refresh_token: fakeTokens.refreshToken,
        expires_in: fakeTokens.expiryIn
    });
}

describe('back end - api', () => {
    beforeEach(async () => {
        generateStubs();
        response = await api.requestTokens();
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
            postStub.rejects(error);
            await expect(api.requestTokens(null)).to.eventually.be.rejectedWith(
                error
            );
        });
    });

    describe('authorisation options', () => {
        let result;
        beforeEach(() => {
            result = api.generateAuthHeader('code', fakeGrantType.AUTH);
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should contain a token api uri', () => {
            expect(result.url).to.equal(
                'https://accounts.spotify.com/api/token'
            );
        });
        it('should contain a form object', () => {
            expect(result.form).to.be.a('object');
        });
        it('should have the correct grant type - authorization', () => {
            expect(result.form.grant_type).to.equal('authorization_code');
        });
        it('should have the correct grant type - authorization', () => {
            result = api.generateAuthHeader('code', fakeGrantType.REFRESH);
            expect(result.form.grant_type).to.equal('refresh_token');
        });
        it('should contain a header object', () => {
            expect(result.headers).to.be.a('object');
        });
        it('should contain an authorization', () => {
            expect(result.headers.Authorization).to.be.a('string');
        });
        it('should return json', () => {
            expect(result.json).to.be.true;
        });
    });

    describe('refreshing an access token from the server', () => {
        let result;
        let req;
        beforeEach(() => {
            const spy = sandbox.spy();
            api.rewire$generateAuthHeader(spy);
            req = httpMocks.createRequest();
            req.body.refreshToken = fakeTokens.refreshToken;
            result = api.refreshAccessToken(req);
        });
        afterEach(() => {
            req.headers = null;
            api.restore();
        });
        it('should generate an auth header', () => {
            expect(api.generateAuthHeader).to.be.calledWith(
                fakeTokens.refreshToken,
                fakeGrantType.REFRESH
            ).calledOnce;
        });
        it('should return a Promise', () => {
            expect(result).to.be.a('Promise');
        });
        it('should reject gracefully', async () => {
            postStub.rejects();
            await expect(api.refreshAccessToken(req)).to.be.rejected;
        });
        describe('resolved promise', () => {
            beforeEach(() => {
                postStub.resolves({
                    access_token: fakeTokens.accessToken,
                    expires_in: fakeTokens.expiryIn
                });
                result = api.refreshAccessToken(req);
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
