import supertest from 'supertest';
import app from 'src/server/';
import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from 'fixtures/authentication/';
import { fakeExpiredError } from 'fixtures/spotify/errors';
import fakeRawData from 'fixtures/spotify/raw-data/normal/index';
import fakeUserData from 'fixtures/spotify/processed-data';
import fakeAudioFeatures from 'fixtures/spotify/processed-data/audio-features';
import fakeStatistics from 'fixtures/spotify/processed-data/statistics';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as Middleware from 'src/server/router/views/results/middleware';
import * as DevMiddleware from 'src/server/router/views/results/dev-middleware';
import * as requestHandler from 'src/server/api/user-data/request-handler';
import * as Processor from 'src/server/api/user-data/processor';
import * as Statistics from 'src/server/api/statistics';
import * as ServerUtil from 'src/server/api/react/utilities';
import * as serverSideRender from 'src/server/api/react/render';
import * as App from 'common/react/apps/results';
import * as Validation from 'src/server/api/user-data/validation';
import normalData from 'fixtures/spotify/raw-data/normal/index';
import emptyData from 'fixtures/spotify/raw-data/empty';

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

        describe('validating user data', () => {
            beforeEach(() => {
                res.locals.data = normalData;
                sandbox.spy(Validation, 'findInvalidData');
                sandbox.spy(Validation, 'isUserValid');
                Middleware.validataUserData(req, res, nextSpy);
            });

            it('should check if there is any invalid data', () => {
                expect(Validation.findInvalidData).to.be.calledOnce;
            });

            it('should check is the user is stil valid', () => {
                expect(Validation.isUserValid).to.be.calledOnce;
            });
            describe('user is valid', () => {
                it('should call next', () => {
                    expect(nextSpy).to.be.calledOnce;
                });
            });
            describe('user is invalid', () => {
                it('should call redirect the route', () => {
                    res.locals.data = emptyData;
                    Middleware.validataUserData(req, res, nextSpy);
                    expect(res.send).to.be.calledOnce;
                });
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
                DevMiddleware.setupDevelopmentAssets(req, res, nextSpy);
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
                sandbox.spy(ServerUtil, 'setupProps');
                Middleware.setupReactProps(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
            describe('props setup', () => {
                it('should be called at least once', () => {
                    expect(ServerUtil.setupProps).to.be.called;
                });
                it('should have the correct arguments for each call', () => {
                    ServerUtil.setupProps.getCalls().forEach(call => {
                        expect(call).to.be.calledWith(
                            sinon.match.object,
                            sinon.match.string,
                            sinon.match.string
                        );
                        expect(call.args[0]).to.be.a('object').and.to.not.be
                            .empty;
                    });
                });
                describe('res.locals', () => {
                    it('should pass the results into res.locals', () => {
                        expect(res.locals.data.react.props).to.be.a('object')
                            .and.to.not.be.empty;
                    });
                    it('should be that each property passed is an object', () => {
                        const obj = res.locals.data.react.props;
                        Object.keys(obj).map(key => {
                            expect(obj[key]).to.be.a('object').and.to.not.be
                                .empty;
                        });
                    });
                });
            });
        });

        describe('generating react assets', () => {
            beforeEach(async () => {
                sandbox.spy(serverSideRender, 'default');

                sandbox.spy(App, 'default');
                // run the previous middleware function to setup our apps
                Middleware.setupReactProps(req, res, () => {});
                await Middleware.generateReactApps(req, res, nextSpy);
            });
            describe('React App', () => {
                it('should be created', () => {
                    expect(App.default).to.be.calledOnce;
                });
            });

            describe('res.locals', () => {
                it('should pass in the rendered apps', () => {
                    expect(res.locals.data.react.apps).to.be.a('object');
                });
                it('should contain the app html', () => {
                    expect(res.locals.data.react.apps.html).to.be.a('string')
                        .and.to.not.be.empty;
                });
                it('should contain the app css ', () => {
                    expect(res.locals.data.react.apps.css).to.be.a('string').and
                        .to.not.be.empty;
                });
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });

        describe('render results page', () => {
            const html = 'fake app html';
            const css = 'fake app css';
            const props = { data: 'fake' };
            beforeEach(() => {
                res.locals.data.react = {
                    apps: {
                        html: html,
                        css: css
                    },
                    props: props
                };
                Middleware.renderResults(req, res, nextSpy);
            });
            describe('sent response', () => {
                it('should call send', () => {
                    expect(res.send).to.be.calledOnce;
                });
                describe('payload', () => {
                    it('should contain the react app html', () => {
                        expect(res.send.getCall(0).args[0]).to.contain(html);
                    });
                    it('should contain the react app css', () => {
                        expect(res.send.getCall(0).args[0]).to.contain(css);
                    });
                    it('should contain stringified props', () => {
                        expect(res.send.getCall(0).args[0]).to.contain(
                            JSON.stringify(props)
                        );
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

        // call endpoint last due to failing test stack traces
        // not showing up with react props warnings
        describe('endpoint', () => {
            it('should exist and respond', async () => {
                await agent
                    .get('/results')
                    .set('Accept', 'text/html')
                    .expect('Content-Type', /html/)
                    .expect(200);
            });
        });
    });
});
