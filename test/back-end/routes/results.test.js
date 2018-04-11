import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';
import * as middleware from '../../../src/server/routes/views/results/middleware';
const agent = supertest.agent(app);
const expect = chai.expect;

chai.use(sinonChai);

let sandbox = sinon.sandbox.create();
let resStub;
let req;
let res;
let next = () => {};

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    resStub = sandbox.stub(res, 'send');
});

afterEach(() => {
    sandbox.restore();
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
    describe('middleware', () => {
        describe('render results page', () => {
            it('should call send', () => {
                middleware.render(req, res, next);
                expect(resStub).to.be.calledOnce;
            });
        });
    });
});
