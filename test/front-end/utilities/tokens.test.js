import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { fakeTokens, fakeTokenNames } from '../../fixtures/authentication/';
import * as Url from '../../../src/client/utilities/url';
import * as Tokens from '../../../src/client/utilities/tokens';
import * as localStorage from '../../../src/client/utilities/local-storage';
import * as serverFetch from '../../../src/client/utilities/server-fetch';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('front end - Tokens', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('refreshing an access token', () => {
        let result;
        let responseSpy;
        beforeEach(async () => {
            const responseObj = {
                accessToken: fakeTokens.accessToken,
                expiryIn: fakeTokens.expiryIn
            };
            responseSpy = sandbox.spy(async () => responseObj);
            const response = {
                json: responseSpy
            };
            sandbox.stub(serverFetch, 'generateHeader').returns({});
            sandbox.stub(serverFetch, 'fetchData').resolves(response);
            result = await Tokens.refreshAccessToken(fakeTokens.refreshToken);
        });
        it('should fetch for the data', () => {
            expect(serverFetch.fetchData).to.be.calledWith('/refresh', {})
                .calledOnce;
        });
        it('should generate a header', () => {
            expect(serverFetch.generateHeader).to.be.calledWith(
                fakeTokens.refreshToken
            ).calledOnce;
        });
        it('should return a new accessToken', () => {
            expect(result.accessToken).to.be.a('string');
        });
        it('should return a new expiry', () => {
            expect(result.expiryIn).to.be.a('number');
        });
        it('should call response json', () => {
            expect(responseSpy).to.be.calledOnce;
        });

        describe('setting access token expiry', () => {
            let result;
            beforeEach(() => {
                sandbox.stub(localStorage, 'setItem');
                result = Tokens.setExpiry(fakeTokens.expiryIn);
            });
            it('should set the correct item in local storage', () => {
                expect(localStorage.setItem).to.be.calledOnce;
            });
        });
    });
});
