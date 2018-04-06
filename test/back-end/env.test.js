import { expect } from 'chai';

describe('env', () => {
    it('should have a client id', () => {
        expect(process.env.CLIENT_ID).to.exist;
    });
    it('should have a client secret', () => {
        expect(process.env.CLIENT_SECRET).to.exist;
    });
    it('should have a host', () => {
        expect(process.env.HOST).to.exist;
    });
    it('should have a scope', () => {
        expect(process.env.SCOPE).to.exist;
    });
    it('should have a response type', () => {
        expect(process.env.RESPONSE_TYPE).to.exist;
    });
    it('should have a redirect uri', () => {
        expect(process.env.REDIRECT_URI).to.exist;
    });
});
