import supertest from 'supertest';
import app from 'src/server/';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
import sinon from 'sinon';

import * as indexPage from 'src/server/router/views/index/index.hbs';
import * as Middleware from 'src/server/router/views/index/middleware';
import { BADNAME } from 'dns';

const expect = chai.expect;
const sandbox = sinon.createSandbox();
const agent = supertest.agent(app);
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe('back end - index route', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });
    describe('middleware,', () => {
        describe('rendering results page', () => {
            beforeEach(() => {
                sandbox.spy(res, 'send');
                sandbox.spy(indexPage, 'default');
                Middleware.renderPage(req, res, () => {});
            });

            it('should call index', () => {
                expect(indexPage.default).to.be.calledOnce;
            });

            it('should call index with the correct arguments', () => {
                expect(indexPage.default).to.be.calledWith({
                    dev: sinon.match.bool,
                    title: sinon.match.string
                });
            });

            it('should call send', () => {
                expect(res.send).to.be.calledOnce;
            });
            it('should call send with the correct arguments', () => {
                expect(res.send.getCall(0).args[0]).to.be.a('string').that.is
                    .not.empty;
            });
        });
    });
});
