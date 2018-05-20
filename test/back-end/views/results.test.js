import supertest from 'supertest';
import app from 'src/server/';
import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from 'fixtures/authentication/';
import { fakeExpiredError } from 'fixtures/spotify/errors';
import fakeRawData from 'fixtures/spotify/raw-data';
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
            .stub(requestHandler, 'requestPersonalData')
            .callsFake(async (token, limit) => {})
            .resolves(fakeRawData);
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
                expect(requestHandler.requestPersonalData).to.be.calledWith(
                    fakeTokens.accessToken
                );
            });
            it('should pass the results into res.locals with no modifications', () => {
                expect(res.locals.data).to.deep.equal(fakeRawData);
            });
        });

        describe('processing user data', () => {
            beforeEach(() => {
                res.locals.data = fakeRawData;
                middleware.processUserData(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('error handling', () => {
            describe('outcome - expired token', () => {
                it('should redirect back to the home page if the error is an expired token', () => {
                    middleware.errorHandler(
                        fakeExpiredError,
                        req,
                        res,
                        nextSpy
                    );
                    expect(res.redirect).to.be.calledWith('/').calledOnce;
                });
            });
            describe('outcome - server error', () => {
                it('should send a 500 internal server error for everything else', () => {
                    sandbox.spy(res, 'status');
                    middleware.errorHandler({}, req, res, nextSpy);
                    expect(res.status).to.be.calledWith(500);
                    expect(res.send).to.be.calledOnce;
                });
            });
        });
    });
});