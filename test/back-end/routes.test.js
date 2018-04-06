import supertest from 'supertest';
import app from '../../src/server/';
import callback from '../../src/server/routes/views/callback';
import * as callbackMiddleware from '../../src/server/routes/views/callback-middleware';
import loginMiddleware from '../../src/';
import chai from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import sinonChai from 'sinon-chai';
import request from 'request';
import httpMocks from 'node-mocks-http';
import nock from 'nock';
const expect = chai.expect;
let sandbox;

beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

chai.use(sinonChai);

const agent = supertest.agent(app);

describe('GET /', () => {
    it('should respond with text/html', async () => {
        await agent
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200);
    });
});

describe('GET /login', () => {
    it('should respond with text/html', async () => {
        const res = await agent
            .get('/login')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/);
    });
    it('should redirect to callback', () => {});
});

describe('GET /results', () => {
    it('should respond with text/html', async () => {
        await agent
            .get('/results')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200);
    });
});

describe('GET /callback', () => {
    it('should respond with 200', async () => {
        await agent.get('/callback').expect(200);
    });

    it('should redirect to results', () => {
        let next = () => {};
        let req = httpMocks.createRequest();
        var res = httpMocks.createResponse();
        let spy = sinon.spy(res, 'redirect');
        callbackMiddleware.redirect(req, res, next);
        expect(res.redirect).to.be.calledOnce;
    });
});

// describe('GET /callback', () => {
//     let stub;

//     beforeEach(() => {
//         stub = sinon.stub(app, 'get').callsFake(function(req, res, next) {
//             res.status(200).json({ stubbed: 'data' });
//         });
//     });

//     afterEach(() => {
//         stub.restore();
//     });

//     it('should do contain a querystring', async () => {
//         stub.resolves({
//             statusCode: 200
//         });
//         const res = await supertest(app).get('/callback');
//         expect(stub).to.be.calledOnce;
//     });
// });
