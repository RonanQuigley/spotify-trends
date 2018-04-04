import supertest from 'supertest';
import app from '../../src/server/';
import chai from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import sinonChai from 'sinon-chai';
import request from 'request';
import nock from 'nock';
const expect = chai.expect;
// means we won't need to call restore in each of our tests
sinonTest(sinon);
chai.use(sinonChai);
describe('GET /', () => {
    it('should respond with text/html', async () => {
        await supertest(app)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200);
    });
});

describe('GET /login', () => {
    it('should redirect to authorization', async () => {
        const res = await supertest(app).get('/login');
        expect(res.header.location).to.include('https://accounts.spotify.com');
        expect(res.redirect).to.be.true;
    });
});

describe('GET /results', () => {
    it('should respond with text/html', async () => {
        await supertest(app)
            .get('/results')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200);
    });
});
