import supertest from 'supertest';
import app from 'src/server/';
import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from 'fixtures/authentication/';
import { fakeExpiredError } from 'fixtures/spotify/errors';
import fakeRawData from 'fixtures/spotify/raw-data';
import fakeUserData from 'fixtures/spotify/processed-data';
import fakeAudioFeatures from 'fixtures/spotify/processed-data/audio-features';
import fakeStatistics from 'fixtures/spotify/processed-data/statistics';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as Middleware from 'src/server/router/views/results/middleware';
import * as requestHandler from 'src/server/api/user-data/request-handler';
import * as Processor from 'src/server/api/user-data/processor';
import * as Statistics from 'src/server/api/statistics';
import * as resultsPage from 'src/server/router/views/results/results.hbs';
import * as renderApp from 'src/server/api/react/index';
import { render } from 'enzyme';

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
        res.locals.data = {
            userData: fakeUserData,
            audioFeatures: fakeAudioFeatures,
            statistics: fakeStatistics
        };
        sandbox.spy(res, 'send');
        sandbox.spy(res, 'redirect');
        nextSpy = sandbox.spy();
        sandbox
            .stub(requestHandler, 'requestPersonalData')
            .callsFake(async (token, limit) => {})
            .resolves(fakeRawData);
        sandbox
            .stub(requestHandler, 'requestAudioFeatures')
            .callsFake(async (token, tracks) => {})
            .resolves(fakeAudioFeatures);
        sandbox.stub(Statistics, 'getStatistics').returns({});
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
                Middleware.getAccessToken(req, res, nextSpy);
            });

            it('should return call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });

            it('should assign the access token to res.locals', () => {
                expect(res.locals.accessToken).to.equal(fakeTokens.accessToken);
            });
        });

        describe('get user data', () => {
            beforeEach(async () => {
                res.locals.accessToken = fakeTokens.accessToken;
                await Middleware.getUserData(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
            it('should make a call to request data', () => {
                expect(requestHandler.requestPersonalData).to.be.calledWith(
                    fakeTokens.accessToken
                );
            });
            it('should pass the raw data into res.locals ', () => {
                expect(res.locals.data).to.deep.equal(fakeRawData);
            });
        });

        describe('processing user data', () => {
            beforeEach(async () => {
                res.locals.data = fakeRawData;
                res.locals.accessToken = fakeTokens.accessToken;
                // we use a default export on the processor module
                sandbox
                    .stub(Processor, 'default')
                    .callsFake(data => {})
                    .returns(fakeUserData);

                await Middleware.processUserData(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
            it('should call process data', () => {
                expect(Processor.default).to.be.calledWith(fakeRawData).and.to
                    .be.calledOnce;
            });
            it('should call request audio features', () => {
                expect(requestHandler.requestAudioFeatures).to.be.calledWith(
                    fakeTokens.accessToken,
                    fakeUserData.tracks
                ).and.to.be.calledOnce;
            });
            it('should pass the processed results into res.locals', () => {
                expect(res.locals.data).to.deep.equal({
                    userData: fakeUserData,
                    audioFeatures: fakeAudioFeatures
                });
            });
        });

        describe('user statistics', () => {
            beforeEach(() => {
                Middleware.getAudioStats(req, res, nextSpy);
            });
            it('should get the statistics', () => {
                expect(Statistics.getStatistics).to.be.calledWith(
                    fakeAudioFeatures
                ).and.to.be.calledOnce;
            });
            it('should pass the results into res.locals', () => {
                expect(res.locals.data.statistics).to.be.a('object');
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('setting up dev assets for react', () => {
            beforeEach(() => {
                res.locals.data = null;
                Middleware.setupDevelopmentAssets(req, res, nextSpy);
            });
            it('should setup res.locals correctly', () => {
                expect(res.locals.data.userData.tracks).to.be.a('object');
                expect(res.locals.data.userData.artists).to.be.a('object');
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('rendering react assets', () => {
            beforeEach(() => {
                sandbox.spy(renderApp, 'default');
                Middleware.generateReactApps(req, res, nextSpy);
            });
            it('should render the apps', () => {
                expect(renderApp.default).to.be.called;
                renderApp.default.getCalls().forEach(call => {
                    expect(call).to.be.calledWith(
                        sinon.match(sinon.match.object, sinon.match.string)
                    );
                });
            });
            describe('res.locals', () => {
                it('should pass in the rendered apps', () => {
                    expect(res.locals.data.react).to.be.a('object');
                });
                it('should contain the tracks', () => {
                    expect(res.locals.data.react.tracks).to.be.a('object');
                });
                it('should contain artists', () => {
                    expect(res.locals.data.react.artists).to.be.a('object');
                });
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('render results page', () => {
            beforeEach(() => {
                sandbox.spy(resultsPage, 'default');
                res.locals.data = {
                    userData: fakeUserData,
                    statistics: fakeStatistics
                };
                Middleware.renderResults(req, res, nextSpy);
            });
            it('should call send', () => {
                expect(res.send).to.be.calledWith(sinon.match.string)
                    .calledOnce;
            });
            it('should render the handlebars page ', () => {
                expect(resultsPage.default).to.be.calledWith(sinon.match.object)
                    .and.to.be.calledOnce;
            });
        });

        describe('error handling', () => {
            describe('outcome - expired token', () => {
                it('should redirect back to the home page if the error is an expired token', () => {
                    Middleware.errorHandler(
                        fakeExpiredError,
                        req,
                        res,
                        nextSpy
                    );
                    expect(res.redirect).to.be.calledWith('/').and.to.be
                        .calledOnce;
                });
            });
            describe('outcome - server error', () => {
                it('should send a 500 internal server error for everything else', () => {
                    sandbox.spy(res, 'status');
                    Middleware.errorHandler({}, req, res, nextSpy);
                    expect(res.status).to.be.calledWith(500);
                    expect(res.send).to.be.calledOnce;
                });
            });
        });
    });
});
