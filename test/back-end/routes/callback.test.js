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
    res.locals = {};
    res.body = null;
}

beforeEach(() => {
    res.locals.tokens = {
        accessToken: 'fake',
        refreshToken: 'fake',
        expiryIn: 'fake'
    };
    generateStubs();
    middleware.redirect(req, res, nextStub);
});

afterEach(function() {
    resetState();
});

describe('GET /callback', () => {
    it('should exist and respond', async () => {
        await agent
            .get('/callback')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(302);
    });
});

describe('middleware', () => {
    describe('redirect', () => {
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
        it('should pass tokens into res locals', () => {
            expect(res.locals.tokens).to.be.a('object');
        });
        it('should call next', () => {
            expect(nextStub).to.be.calledOnce;
        });
    });
});
