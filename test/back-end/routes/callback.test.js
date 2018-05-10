import supertest from 'supertest';
import app from '../../../src/server/';
import * as api from '../../../src/server/api';
import * as middleware from '../../../src/server/routes/views/callback/middleware';
import queryString from 'querystring';
import httpMocks from 'node-mocks-http';

const agent = supertest.agent(app);

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();
let nextMock;

function initSpies() {
    jest.spyOn(queryString, 'stringify');
    jest.spyOn(api, 'requestTokens').mockResolvedValue({});
    jest.spyOn(res, 'redirect');
}

function initTokens() {
    res.locals.tokens = {
        accessToken: 'fake',
        refreshToken: 'fake',
        expiryIn: 'fake'
    };
}

function resetState() {
    jest.restoreAllMocks();
    res.locals = {};
    res.body = null;
}

describe('callback route', () => {

    beforeEach(() => {
        initTokens();
        initSpies();
        nextMock = jest.fn();
    });

    afterEach(function () {
        resetState();
    });

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
        describe('redirect', () => {
            beforeEach(() => {
                middleware.redirect(req, res, nextMock);
            });
            it('should redirect to results', () => {
                expect(res.redirect).toHaveBeenCalledTimes(1);
            });
            it('should generate a query string', () => {
                expect(queryString.stringify).toHaveBeenCalledTimes(1);
            });
        });
        describe('auth user', () => {
            beforeEach(async () => {
                middleware.authUser(req, res, nextMock);
            });
            it('should call next', async () => {
                expect(nextMock).toHaveBeenCalledTimes(1);
            });
        });
    });
});
