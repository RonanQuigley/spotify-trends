import * as uri from '../../../src/client/utilities/uri';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use(sinonChai);

let sandbox = sinon.sandbox.create();

describe('front end - uri', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('get query string element', () => {
        let result;
        let windowStub;
        let decodeSpy;
        beforeEach(() => {
            decodeSpy = sandbox.spy(global, 'decodeURIComponent');
            windowStub = sandbox
                .stub(uri, 'getLocationHref')
                .returns(
                    'http://localhost:3000/results?accessToken=fake_access_token&refreshToken=fake_refresh_token&expiryIn=fake_expiry_in'
                );
            result = uri.getQueryStringElement('accessToken');
        });
        it('should return a string', () => {
            expect(result).to.be.a('string');
        });
        it('should return an access token', () => {
            expect(result).to.equal('fake_access_token');
        });
        it('should return a refresh token', () => {
            result = uri.getQueryStringElement('refreshToken');
            expect(result).to.equal('fake_refresh_token');
        });
        it('should return an expiry', () => {
            result = uri.getQueryStringElement('expiryIn');
            expect(result).to.equal('fake_expiry_in');
        });
        it('should get location href', () => {
            expect(windowStub).to.be.calledOnce;
        });
        it('should call decode uri component', () => {
            expect(decodeSpy).to.be.calledOnce;
        });
    });
});
