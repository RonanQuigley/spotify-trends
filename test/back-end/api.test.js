import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import request from 'request-promise-native';
import chaiAsPromised from 'chai-as-promised';
import * as api from '../../src/server/api';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;
let sandbox = sinon.sandbox.create();
let response;
let postSpy;
let postStub;
let requestTokensStub;

function generateStubs() {
    postStub = sandbox.stub(request, 'post');
    postStub.resolves({
        body: {
            access_token: 'stub',
            refresh_token: 'stub',
            expires_in: 'stub'
        }
    });
}

describe('api', () => {
    beforeEach(async () => {
        generateStubs();
        response = await api.requestTokens();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('request tokens', () => {
        it('should call request.post', () => {
            expect(postStub).to.be.calledOnce;
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
        it('should throw an error', async () => {
            requestTokensStub = sandbox
                .stub(api, 'requestTokens')
                .rejects(new Error());
            await expect(api.requestTokens(null)).to.be.rejectedWith(Error);
            requestTokensStub.restore();
        });
    });

    describe('authorisation options', () => {
        let result;
        beforeEach(() => {
            result = api.generateAuthOptions(null);
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should contain a token api url', () => {
            expect(result.url).to.equal(
                'https://accounts.spotify.com/api/token'
            );
        });
        it('should contain a form object', () => {
            expect(result.form).to.be.a('object');
        });
        it('should have the correct grant type', () => {
            expect(result.form.grant_type).to.equal('authorization_code');
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
});
