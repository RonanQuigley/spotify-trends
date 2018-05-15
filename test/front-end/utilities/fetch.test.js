import chai from 'chai';
import sinon from 'sinon';
import { fakeTokens } from '../../fakes';
import sinonChai from 'sinon-chai';
import * as serverFetch from '../../../src/client/utilities/server-fetch';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

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
            const result = serverFetch.fetchData('refresh', {});
            expect(result).to.be.a('Promise');
        });
    });

    describe('generate header', () => {
        let result;
        beforeEach(() => {
            sandbox.spy(JSON, 'stringify');
            result = serverFetch.generateHeader(
                fakeTokens.refreshToken,
                fakeTokens.accessToken
            );
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        describe('headers', () => {
            it('should be a object ', () => {
                expect(result.headers).to.be.a('object');
            });
            it('should contain the correct content-type', () => {
                expect(result.headers['Content-Type']).to.equal(
                    'application/json'
                );
            });
            it('should contain the correct response acceptance', () => {
                expect(result.headers['Content-Type']).to.equal(
                    'application/json'
                );
            });
        });
        describe('body', () => {
            it('should be a string', () => {
                expect(result.body).to.be.a('string');
            });
            it('call stringify', () => {
                const obj = {
                    expiredToken: fakeTokens.accessToken,
                    refreshToken: fakeTokens.refreshToken
                };
                expect(JSON.stringify).to.be.calledWith(obj).calledOnce;
            });
        });
        it('should contain a post method', () => {
            expect(result.method).to.equal('POST');
        });
    });
});
