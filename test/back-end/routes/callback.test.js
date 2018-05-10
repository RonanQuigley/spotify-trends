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

const sandbox = sinon.sandbox.create();

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

let nextStub;

function generateStubs() {
    sandbox.stub(queryString, 'stringify');
    sandbox.stub(api, 'requestTokens').resolves({});
    nextStub = sandbox.stub();
    sandbox.stub(res, 'redirect');
}

function resetState() {
    sandbox.restore();
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

    afterEach(() => {
        resetState();
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
        describe('redirect', () => {
            beforeEach(() => {
                middleware.redirect(req, res, nextStub);
            });
            it('should redirect to results', () => {
                expect(res.redirect).to.be.calledOnce;
            });
            it('should generate a query string', () => {
                expect(queryString.stringify).to.be.calledOnce;
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
