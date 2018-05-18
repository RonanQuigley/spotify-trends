import supertest from 'supertest';
import app from 'src/server/';
import * as middleware from 'src/server/router/endpoints/login/middleware';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

let req;
let res;
let nextSpy;

describe('back end - login route', () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        sandbox.spy(res, 'redirect');
        nextSpy = sandbox.spy();
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
                middleware.redirectToAuth(req, res, nextSpy);
                expect(res.redirect).to.be.calledOnce;
            });
        });
    });
});
