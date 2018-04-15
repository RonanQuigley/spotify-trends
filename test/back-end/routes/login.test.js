import supertest from 'supertest';
import app from '../../../src/server/';
import * as api from '../../../src/server/api';
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
let spyStub;
let nextStub;

function generateStubs() {
    spyStub = sandbox.stub(res, 'redirect');
    nextStub = sandbox.stub();
}

function createHttpMocks() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
}

describe('login route', () => {
    beforeEach(function() {
        createHttpMocks();
        generateStubs();
    });

    afterEach(function() {
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
                middleware.authUser(req, res, nextStub);
                expect(spyStub).to.be.calledOnce;
            });
        });
    });
});
