import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpMocks from 'node-mocks-http';

const agent = supertest.agent(app);
const expect = chai.expect;

chai.expect;

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
let req;
let res;
let spy;
let next;

describe('index route', () => {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        spy = sandbox.spy(res, 'redirect');
        next = sandbox.spy();
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

    it('should exist and respond', async () => {
        await agent
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200);
    });
});
