import * as uri from '../../../src/client/utilities/uri';
import { fakeUrl, fakeTokens, fakeTokenNames } from '../../fixtures';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('front end - uri', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('get query string element from url', () => {
        let result;

        beforeEach(() => {
            const stub = sandbox.stub().returns(fakeUrl);
            sandbox.spy(global, 'decodeURIComponent');
            uri.rewire$getLocationHref(stub);
            result = uri.getQueryStringElement(fakeTokenNames.accessToken);
        });

        it('should return a string', () => {
            expect(result).to.be.a('string');
        });
        it('should return an access token', () => {
            expect(result).to.equal(fakeTokens.accessToken);
        });
        it('should return a refresh token', () => {
            result = uri.getQueryStringElement(fakeTokenNames.refreshToken);
            expect(result).to.equal(fakeTokens.refreshToken);
        });
        it('should return an expiry', () => {
            result = uri.getQueryStringElement(fakeTokenNames.expiryIn);
            expect(result).to.equal(fakeTokens.expiryIn);
        });
        it('should get location href', () => {
            expect(uri.getLocationHref).to.be.calledOnce;
        });
        it('should call decode uri component', () => {
            expect(global.decodeURIComponent).to.be.calledOnce;
        });
    });
});
