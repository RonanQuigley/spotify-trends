import supertest from 'supertest';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';

// code to test
import app from '../../src/server/';
import * as callbackMiddleware from '../../src/server/routes/views/callback/middleware';
import * as loginMiddleware from '../../src/server/routes/views/login/middleware';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.use(sinonChai);

const next = () => {};

let sandbox;
let req;
let res;
let spy;

beforeEach(function() {
    sandbox = sinon.sandbox.create();
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    spy = sandbox.spy(res, 'redirect');
});

afterEach(function() {
    sandbox.restore();
});

describe('GET /', () => {
    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/login')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(302);
        });
    });
});

describe('GET /login', () => {
    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/login')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(302);
        });
    });

    describe('middleware', () => {
        it('should redirect to callback', () => {
            loginMiddleware.authUser(req, res, next);
            expect(res.redirect).to.be.calledOnce;
        });
    });
});

describe('GET /results', () => {
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

describe('GET /callback', () => {
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
        it('should redirect to results', () => {
            callbackMiddleware.redirect(req, res, next);
            expect(res.redirect).to.be.calledOnce;
        });
    });
});
