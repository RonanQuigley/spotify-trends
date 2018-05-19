import supertest from 'supertest';
import app from 'src/server/';
import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from 'fixtures/authentication/';
import { fakeTopArtists } from 'fixtures/spotify/artists';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as middleware from 'src/server/router/views/results/middleware';
import * as requestHandler from 'src/server/api/user-data/request-handler';
const agent = supertest.agent(app);
const expect = chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
let req;
let res;
let nextSpy;

describe('back end - results view', () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        sandbox.spy(res, 'send');
        sandbox.spy(res, 'redirect');
        nextSpy = sandbox.spy();
        sandbox
            .stub(requestHandler, 'requestData')
            .callsFake(async token => {})
            .resolves([fakeTopArtists]);
    });

    afterEach(() => {
        sandbox.restore();
    });
    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/results')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

    describe('middleware', () => {
        describe('getting the access token', () => {
            beforeEach(() => {
                req.query.accessToken = fakeTokens.accessToken;
                middleware.getAccessToken(req, res, nextSpy);
            });

            it('should return call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });

            it('should assign the access token to res.locals', () => {
                expect(res.locals.accessToken).to.equal(fakeTokens.accessToken);
            });
        });

        describe('render results page', () => {
            it('should call send', () => {
                middleware.renderResults(req, res, nextSpy);
                expect(res.send).to.be.calledOnce;
            });
        });

        describe('get user data', () => {
            beforeEach(async () => {
                res.locals.accessToken = fakeTokens.accessToken;
                await middleware.getUserData(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
            it('should make a call to request data', () => {
                expect(requestHandler.requestData).to.be.calledWith(
                    fakeTokens.accessToken
                );
            });
            it('should pass the results into res.locals with no modifications', () => {
                expect(res.locals.data[0]).to.deep.equal(fakeTopArtists);
            });
        });

        describe('error handling for an expired access token', () => {
            beforeEach(() => {
                const error = () => {};
                middleware.handleExpiredRejection(error, req, res, nextSpy);
            });
            it('should trigger a redirect back to the home page', () => {
                expect(res.redirect).to.be.calledWith('/').calledOnce;
            });
        });
    });
});
