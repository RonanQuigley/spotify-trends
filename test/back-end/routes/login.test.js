import supertest from 'supertest';
import app from '../../../src/server/';
import * as middleware from '../../../src/server/routes/views/login/middleware';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.expect;

chai.use(sinonChai);

let sandbox = sinon.sandbox.create();
let req;
let res;
let nextStub;

function generateStubs() {
    sandbox.stub(res, 'redirect');
    nextStub = sandbox.stub();
}

function createHttpMocks() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
}

describe('login route', () => {
    beforeEach(() => {
        createHttpMocks();
        generateStubs();
    });

    afterEach(() => {
        sandbox.restore();
    });

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
        describe('authUser', () => {
            it('should redirect to callback', () => {
                middleware.redirectUser(req, res, nextStub);
                expect(res.redirect).to.be.calledOnce;
            });
        });
    });
});
