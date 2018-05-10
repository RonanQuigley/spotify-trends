describe('env', () => {
    it('should have a client id', () => {
        expect(process.env.CLIENT_ID).toBeDefined();
    });
    it('should have a client secret', () => {
        expect(process.env.CLIENT_SECRET).toBeDefined();
    });
    it('should have a host', () => {
        expect(process.env.HOST).toBeDefined();
    });
    it('should have a scope', () => {
        expect(process.env.SCOPE).toBeDefined();
    });
    it('should have a response type', () => {
        expect(process.env.RESPONSE_TYPE).toBeDefined();
    });
    it('should have a redirect uri', () => {
        expect(process.env.REDIRECT_URI).toBeDefined();
    });
});
