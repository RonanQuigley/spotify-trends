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
            expect(window.fetch.firstCall.args[0]).to.be.a('string');
        });
        it('should return a promise', () => {
            window.fetch.returns(new Promise(() => {}, () => {}));
            let result = serverFetch.fetchData('refresh', {});
            expect(result).to.be.a('Promise');
        });
    });

    describe('getting a new access token', () => {
        let result;
        beforeEach(async () => {
            sandbox.stub(serverFetch, 'generateHeader').returns({});
            sandbox.stub(serverFetch, 'fetchData').resolves({
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
            expect(result.accessToken).to.be.a('string');
        });
        it('should return a refreshToken', () => {
            expect(result.refreshToken).to.be.a('string');
        });
    });

    describe('generate header', () => {
        const result = serverFetch.generateHeader(
            'fake refresh',
            'fake access'
        );
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should have content-type as json', () => {
            expect(result.json).to.be.true;
        });
        it('should contain an access token', () => {
            expect(result.headers.accessToken).to.be.a('string');
        });
        it('should contain a refresh token', () => {
            expect(result.headers.refreshToken).to.be.a('string');
        });
    });
});
