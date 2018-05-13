import supertest from 'supertest';
import app from '../../../src/server/';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import * as middleware from '../../../src/server/routes/views/refresh/middleware';
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
        sandbox.spy(res, 'redirect');
        nextSpy = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
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
            beforeEach(() => {
                result = middleware.getHeaderData();
            });

            it('should return a string', () => {
                expect(result).to.be.a('string');
            });
        });
    });
});
