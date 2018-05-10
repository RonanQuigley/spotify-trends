import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as serverFetch from '../../../src/client/utilities/server-fetch';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('front end - server fetch', () => {
    beforeEach(() => {
        sandbox.stub(window, 'fetch');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('fetch data', () => {
        it('should be called with an endpoint', () => {
            window.fetch.resolves({ data: 'fake' });
            serverFetch.fetchData('refresh', {});
            expect(typeof window.fetch.firstCall.args[0]).toBe('string');
        });
        it('should return a promise', () => {
            window.fetch.returns(new Promise(() => {}, () => {}));
            let result = serverFetch.fetchData('refresh', {});
            expect(typeof result).toBe('Promise');
        });
    });

    describe('getting a new access token', () => {
        let result;
        beforeEach(async () => {
            sandbox.stub(serverFetch, 'generateHeader').returns({});
            sandbox.stub(serverFetch, 'fetchData').returns({
                accessToken: 'fake',
                expiryIn: 'fake'
            });
            result = await serverFetch.getNewAccessToken('refresh', {});
        });
        it('should fetch for the data', () => {
            expect(serverFetch.fetchData).to.be.calledOnce;
        });
        it('should generate a header', () => {
            expect(serverFetch.generateHeader).to.be.calledOnce;
        });
        it('should return an accessToken', () => {
            expect(typeof result.accessToken).toBe('string');
        });
        it('should return a refreshToken', () => {
            expect(typeof result.refreshToken).toBe('string');
        });
    });

    describe('generate header', () => {
        const result = serverFetch.generateHeader(
            'fake refresh',
            'fake access'
        );
        it('should return an object', () => {
            expect(typeof result).toBe('object');
        });
        it('should have content-type as json', () => {
            expect(result.json).toBe(true);
        });
        it('should contain an access token', () => {
            expect(typeof result.headers.accessToken).toBe('string');
        });
        it('should contain a refresh token', () => {
            expect(typeof result.headers.refreshToken).toBe('string');
        });
    });
});
