import supertest from 'supertest';
import app from '../../../src/server/';
import * as Tokens from '../../../src/server/api/authentication/tokens';
import * as middleware from '../../../src/server/router/endpoints/callback/middleware';
import { fakeTokens } from '../../fixtures/authentication/';
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
    let requestTokensStub;
    beforeEach(() => {
        sandbox.stub(queryString, 'stringify');
        requestTokensStub = sandbox.stub(Tokens, 'requestTokens');
        requestTokensStub.resolves({});
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
            it('should call next', async () => {
                await middleware.authUser(req, res, nextSpy);
                expect(nextSpy).to.be.calledWith().calledOnce;
            });
            it('should call next with an error in the event of a rejection', async () => {
                const error = new Error('fake error');
                requestTokensStub.rejects(error);
                await middleware.authUser(req, res, nextSpy);
                expect(nextSpy).to.be.calledWithMatch(error);
            });
        });
    });
});
