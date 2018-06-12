import supertest from 'supertest';
import app from 'src/server/';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
import sinon from 'sinon';
import * as Middleware from 'src/server/router/views/index/middleware';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
const agent = supertest.agent(app);
const req = httpMocks.createRequest();
const res = httpMocks.createResponse();

describe('back end - index route', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });
    describe('middleware,', () => {
        describe('rendering results page', () => {
            beforeEach(() => {
                sandbox.spy(res, 'send');
                // setup our apps before our render page tests
                Middleware.setupReactApp(req, res, () => {});
                Middleware.renderPage(req, res, () => {});
            });
            it('should call send', () => {
                expect(res.send).to.be.calledOnce;
            });
            it('should render a string that is not empty to the the page', () => {
                expect(res.send.getCall(0).args[0]).to.be.a('string').that.is
                    .not.empty;
            });
        });
    });
});
