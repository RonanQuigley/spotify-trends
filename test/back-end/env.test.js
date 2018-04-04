import { expect } from 'chai';

describe('env', () => {
    it('should have a client id', () => {
        expect(process.env.CLIENT_ID).to.exist;
    });
    it('should have a client secret', () => {
        expect(process.env.CLIENT_SECRET).to.exist;
    });
});
