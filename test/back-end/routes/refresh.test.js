import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import { fakeTokens } from '../../fakes';
import sinon from 'sinon';
import * as middleware from '../../../src/server/routes/views/refresh/middleware';
import * as api from '../../../src/server/api';
import sinonChai from 'sinon-chai';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

let req;
let res;
let nextSpy;

describe('back end - refresh route', () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.headers.refreshToken = res = httpMocks.createResponse();
        sandbox.spy(res, 'redirect');
        nextSpy = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
        req.headers = null;
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/refresh')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

    describe('middleware', () => {
        describe('getting header data', () => {
            let result;
            let stub;
            beforeEach(() => {
                stub = sandbox.stub(api, 'refreshAccessToken');
                sandbox.stub(res, 'send');
                nextSpy = sandbox.stub();
            });

            it('should call next on reject', async () => {
                const error = new Error();
                stub.rejects(error);
                await middleware.processRequest(req, res, nextSpy);
                expect(nextSpy).to.be.calledOnce.calledWith(error);
            });

            it('should send the response', async () => {
                stub.resolves({});
                await middleware.processRequest(req, res, nextSpy);
                expect(res.send).to.be.calledOnce;
            });
        });
    });
});
