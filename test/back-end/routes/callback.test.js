import supertest from 'supertest';
import app from '../../../src/server/';
import * as api from '../../../src/server/api';
import * as middleware from '../../../src/server/routes/views/callback/middleware';
import { fakeTokens } from '../../fakes';
import queryString from 'querystring';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';

const agent = supertest.agent(app);
const expect = chai.expect;
chai.expect;
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

let req;
let res;
let nextSpy;

function initMiddlewareTests() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    res.locals.tokens = {
        accessToken: fakeTokens.accessToken,
        refreshToken: fakeTokens.refreshToken,
        expiryIn: fakeTokens.expiryIn
    };
    nextSpy = sandbox.spy();
    sandbox.spy(res, 'redirect');
}

describe('back end - callback route', () => {
    beforeEach(() => {
        sandbox.stub(queryString, 'stringify');
        sandbox.stub(api, 'requestTokens').resolves({});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/callback')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(302);
        });
    });

    describe('middleware', () => {
        beforeEach(() => {
            initMiddlewareTests();
            middleware.redirect(req, res, nextSpy);
        });

        afterEach(() => {
            res.locals = {};
            res.body = null;
        });

        describe('redirect', () => {
            it('should redirect to results', () => {
                expect(res.redirect).to.be.calledOnce;
            });
            it('should generate a query string', () => {
                expect(queryString.stringify).to.be.calledOnce;
            });
        });

        describe('auth user', () => {
            beforeEach(async () => {
                await middleware.authUser(req, res, nextSpy);
            });
            it('should call next', () => {
                expect(nextSpy).to.be.calledOnce;
            });
        });
    });
});
