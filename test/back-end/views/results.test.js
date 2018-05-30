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
import * as Render from 'src/server/api/react/render';
import * as Utilities from 'src/server/api/react/utilities';
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
        /* 
            we don't want to make requests to spotify servers
            so stub all operations that involve data requests 
        */
        sandbox
            .stub(requestHandler, 'requestPersonalData')
            .callsFake(async (token, limit) => {})
            .resolves(fakeRawData);
        sandbox
            .stub(requestHandler, 'requestAudioFeatures')
            .callsFake(async (token, tracks) => {})
            .resolves(fakeAudioFeatures);
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
                sandbox.spy(Statistics, 'getStatistics');
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

        describe('setting up react props', () => {
            beforeEach(() => {
                sandbox.spy(Utilities, 'setupProps');
                Middleware.setupReactProps(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
            describe('props setup', () => {
                it('should be called', () => {
                    expect(Utilities.setupProps).to.be.called;
                });
                it('should pass the results into res.locals', () => {
                    expect(res.locals.data.react.props).to.be.a('object').and.to
                        .not.be.empty;
                });
            });
        });

        describe('generating react assets', () => {
            beforeEach(() => {
                sandbox.spy(Render, 'renderApp');
                res.locals.data.react = {
                    props: {}
                };
                res.locals.data.react.props.artists = Utilities.setupProps(
                    fakeUserData.artists,
                    Utilities.id.ARTISTS,
                    Utilities.header.ARTISTS
                );

                res.locals.data.react.props.tracks = Utilities.setupProps(
                    fakeUserData.tracks,
                    Utilities.id.TRACKS,
                    Utilities.header.TRACKS
                );
                Middleware.generateReactApps(req, res, nextSpy);
            });
            it('should render the apps', () => {
                expect(Render.renderApp).to.be.called;
                Render.renderApp.getCalls().forEach(call => {
                    expect(call).to.be.calledWith(
                        sinon.match(sinon.match.object)
                    ).and.to.not.be.empty;
                });
            });
            describe('res.locals', () => {
                it('should pass in the rendered apps', () => {
                    expect(res.locals.data.react.apps).to.be.a('object');
                });
                it('should contain the tracks', () => {
                    expect(res.locals.data.react.apps.tracks).to.be.a('object');
                });
                it('should contain artists', () => {
                    expect(res.locals.data.react.apps.artists).to.be.a(
                        'object'
                    );
                });
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('render results page', () => {
            let fakeData;
            beforeEach(() => {
                sandbox.spy(resultsPage, 'default');

                fakeData = res.locals.data.react = {
                    props: {
                        artists: {},
                        tracks: {},
                        statistics: {}
                    },
                    apps: {
                        artists: {
                            html: 'fake rendered app html',
                            css: 'fake rendered css'
                        },
                        tracks: {
                            html: 'fake rendered app html',
                            css: 'fake rendered css'
                        }
                    }
                };
                Middleware.renderResults(req, res, nextSpy);
            });
            it('should call send', () => {
                expect(res.send).to.be.calledWith(sinon.match.string).and.to.be
                    .calledOnce;
            });
            describe('rendering payload', () => {
                it('should render the handlebars page ', () => {
                    expect(resultsPage.default).to.be.calledOnce;
                });
                describe('call arguments', () => {
                    let args;
                    beforeEach(() => {
                        args = resultsPage.default.getCall(0).args[0];
                    });
                    it('should have a props property that contains the props data', () => {
                        expect(args.react.props).to.deep.equal(fakeData.props);
                    });
                    it('should have a react property that contains the react data', () => {
                        expect(args.react.apps).to.deep.equal(fakeData.apps);
                    });
                    it('should contain a dev property', () => {
                        expect(args)
                            .to.have.property('dev')
                            .and.to.be.a('boolean');
                    });
                });
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
