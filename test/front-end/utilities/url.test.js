import * as Url from '../../../src/client/utilities/url';
import {
    fakeUrl,
    fakeTokens,
    fakeTokenNames
} from '../../fixtures/authentication/';
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

    describe('redirect user', () => {
        it('should call window.location.assign', () => {
            sandbox.stub(window.location, 'assign');
            Url.redirect();
            expect(window.location.assign).to.be.calledOnce;
        });
    });

    describe('get query string element from url', () => {
        let result;

        beforeEach(() => {
            const stub = sandbox.stub().returns(fakeUrl);
            sandbox.spy(global, 'decodeURIComponent');
            Url.rewire$getLocationHref(stub);
            result = Url.getQueryStringElement(fakeTokenNames.accessToken);
        });

        it('should return a string', () => {
            expect(result).to.be.a('string');
        });
        it('should return an access token', () => {
            expect(result).to.equal(fakeTokens.accessToken);
        });
        it('should return a refresh token', () => {
            result = Url.getQueryStringElement(fakeTokenNames.refreshToken);
            expect(result).to.equal(fakeTokens.refreshToken);
        });
        it('should return an expiry', () => {
            result = Url.getQueryStringElement(fakeTokenNames.expiryIn);
            expect(result).to.equal(fakeTokens.expiryIn.toString());
        });
        it('should get location href', () => {
            expect(Url.getLocationHref).to.be.calledOnce;
        });
        it('should call decode uri component', () => {
            expect(global.decodeURIComponent).to.be.calledOnce;
        });
    });
});
