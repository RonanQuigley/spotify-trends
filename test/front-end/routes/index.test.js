import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as tokens from '../../../src/client/utilities/tokens';
import * as index from '../../../src/client/pages/index/index';
import 'whatwg-fetch';
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('front end - index page', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('redirecting to results page', () => {
        it('should call window.location.assign', () => {
            let assignStub = sandbox.stub(window.location, 'assign');
            index.redirect('results', 'fake_access_token');
            expect(assignStub).to.be.calledOnce;
        });
    });
    describe('is an existing user', () => {
        let tokenStub;
        let redirectStub;
        let refreshStub;
        beforeEach(() => {
            tokenStub = sandbox.stub(tokens, 'getValidAccessToken');
            tokenStub.returns('fake');
            // tokenStub.returns(null);
            redirectStub = sandbox.stub(index, 'redirect');
            refreshStub = sandbox.stub(index, 'refreshAccessToken');
            index.isExistingUser();
        });
        it('should get a valid access token', () => {
            expect(tokenStub).to.be.calledOnce;
        });
        it('should redirect when an access token exists', () => {
            expect(redirectStub).to.be.calledOnce;
        });
        it("should call refresh token when an access token doesn't exist", () => {
            tokenStub.returns(null);
            index.isExistingUser();
            expect(refreshStub).to.be.calledOnce;
        });
    });
    // describe('refresh access token', () => {
    //     let tokenStub;
    //     let fetchStub;
    //     beforeEach(() => {
    //         tokenStub = sandbox.stub(tokens);
    //         fetchStub = sandbox.stub(window, 'fetch');
    //         fetchStub.resolves({ data: 'foo' });
    //         index.refreshAccessToken();
    //     });
    //     afterEach(() => {
    //         window.fetch.restore();
    //     });
    //     it('should call fetch', () => {
    //         expect(fetchStub).to.be.called;
    //     });
    // });
});
