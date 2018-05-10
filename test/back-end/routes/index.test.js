import supertest from 'supertest';
import app from '../../../src/server/';
const agent = supertest.agent(app);

describe('index route', () => {

    describe('endpoint', () => {
        it('should exist and respond', async () => {
            await agent
                .get('/')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200);
        });
    });

});
