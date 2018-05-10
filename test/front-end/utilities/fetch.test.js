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
        it('should return a promise', () => {
            window.fetch.returns(new Promise(() => {}, () => {}));
            const result = serverFetch.fetchData('refresh', {});
            expect(result).to.be.a('Promise');
        });
    });

    describe('getting a new access token', () => {
        let result;
        let fetchStub;
        let headerStub;
        beforeEach(async () => {
            headerStub = sandbox.stub().returns({});
            fetchStub = sandbox.stub().resolves({
                accessToken: 'fake',
                expiryIn: 'fake'
            });
            // we need to use rewire to access the functions within
            // the same module under test; rewire is on the default obj
            serverFetch.default.__set__({
                generateHeader: headerStub,
                fetchData: fetchStub
            });
            result = await serverFetch.getNewAccessToken('refresh', {});
        });
        it('should generate a header', () => {
            expect(headerStub).to.be.calledOnce;
        });
        it('should fetch for the data', () => {
            expect(fetchStub).to.be.calledOnce;
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
