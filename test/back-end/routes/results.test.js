import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from '../../fixtures';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as middleware from '../../../src/server/routes/views/results/middleware';
const agent = supertest.agent(app);
const expect = chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
let resStub;
let req;
let res;
let nextSpy;

describe('back end - results route', () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        sandbox.spy(res, 'send');
        nextSpy = sandbox.spy();
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
            beforeEach(() => {
                middleware.getUserData(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });
    });
});
