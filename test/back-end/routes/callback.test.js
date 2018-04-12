import supertest from 'supertest';
import app from '../../../src/server/';
import * as api from '../../../src/server/api';
import * as middleware from '../../../src/server/routes/views/callback/middleware';
import queryString from 'querystring';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';

const agent = supertest.agent(app);
const expect = chai.expect;
chai.expect;
chai.use(sinonChai);

let sandbox = sinon.sandbox.create();

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

let qsStub;
let apiStub;
let nextStub;
let redirectStub;
let fake;

function generateStubs() {
    qsStub = sandbox.stub(queryString, 'stringify');
    fake = sandbox.stub(api, 'fake').returns('called by stub');
    apiStub = sandbox.stub(api, 'requestTokens').returns({});
    nextStub = sandbox.stub();
    redirectStub = sandbox.stub(res, 'redirect');
}

function resetState() {
    sandbox.restore();
    sandbox.resetBehavior();
    sandbox.resetHistory();
    res.locals = {};
    res.body = null;
}

function initTokens() {
    res.locals.tokens = {
        accessToken: 'fake',
        refreshToken: 'fake',
        expiryIn: 'fake'
    };
}

describe('callback route', () => {
    beforeEach(() => {
        initTokens();
        generateStubs();
    });

    afterEach(function() {
        resetState();
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/callback')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(302)
                .catch(err => {
                    throw err;
                });
        });
    });

    describe('middleware', () => {
        describe('redirect', () => {
            beforeEach(() => {
                middleware.redirect(req, res, nextStub);
            });
            it('should redirect to results', () => {
                expect(redirectStub).to.be.calledOnce;
            });
            it('should generate a query string', () => {
                expect(qsStub).to.be.calledOnce;
            });
        });
        describe('auth user', () => {
            beforeEach(async () => {
                middleware.authUser(req, res, nextStub);
            });
            it('should call next', async () => {
                expect(nextStub).to.be.calledOnce;
            });
        });
    });
});
