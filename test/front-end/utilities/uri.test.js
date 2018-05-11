import * as uri from '../../../src/client/utilities/uri';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
    rewire$getLocationHref,
    restore
} from '../../../src/client/utilities/uri';

const expect = chai.expect;
chai.use(sinonChai);

const sandbox = sinon.sandbox.create();
const fakeUrl =
    'http://localhost:3000/results?accessToken=fakeAccessToken&refreshToken=fakeRefreshToken&expiryIn=3600';

describe('front end - uri', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('get query string element from url', () => {
        beforeEach(() => {
            const stub = sandbox.stub().returns(fakeUrl);
            sandbox.spy(global, 'decodeURIComponent');
            console.log(window.decodeURIComponent);
            rewire$getLocationHref(stub);
        });

        afterEach(() => {
            restore();
        });

        it('should get the href from window.location', () => {
            uri.getQueryStringElement('accessToken');
            expect(uri.getLocationHref).to.be.calledOnce;
        });
    });

    // describe('get query string element', () => {
    //     let result;
    //     let windowStub;
    //     let decodeSpy;
    //     beforeEach(() => {
    //         decodeSpy = sandbox.spy(global, 'decodeURIComponent');
    //         rewire$getLocationHref((windowStub = sinon.stub()));
    //         result = uri.getQueryStringElement('accessToken');
    //     });
    //     afterEach(() => {
    //         restore();
    //     });
    //     it('should return a string', () => {
    //         expect(result).to.be.a('string');
    //     });
    //     it('should return an access token', () => {
    //         expect(result).to.equal('fake_access_token');
    //     });
    //     it('should return a refresh token', () => {
    //         result = uri.getQueryStringElement('refreshToken');
    //         expect(result).to.equal('fake_refresh_token');
    //     });
    //     it('should return an expiry', () => {
    //         result = uri.getQueryStringElement('expiryIn');
    //         expect(result).to.equal('fake_expiry_in');
    //     });
    //     it('should get location href', () => {
    //         expect(windowStub).to.be.calledOnce;
    //     });
    //     it('should call decode uri component', () => {
    //         expect(decodeSpy).to.be.calledOnce;
    //     });
    // });
});
