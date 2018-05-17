import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import * as Header from '../../../src/server/api/authentication/header';
import { fakeGrantType } from '../../fixtures';
chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();
let response;

describe('back end - api - header', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('generating an authorisation header', () => {
        let result;
        beforeEach(() => {
            result = Header.generateAuthHeader('code', fakeGrantType.AUTH);
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should contain a token api uri', () => {
            expect(result.url).to.equal(
                'https://accounts.spotify.com/api/token'
            );
        });
        it('should contain a form object', () => {
            expect(result.form).to.be.a('object');
        });
        it('should have the correct grant type - authorization', () => {
            expect(result.form.grant_type).to.equal('authorization_code');
        });
        it('should have the correct grant type - authorization', () => {
            result = Header.generateAuthHeader('code', fakeGrantType.REFRESH);
            expect(result.form.grant_type).to.equal('refresh_token');
        });
        it('should contain a header object', () => {
            expect(result.headers).to.be.a('object');
        });
        it('should contain an authorization', () => {
            expect(result.headers.Authorization).to.be.a('string');
        });
        it('should return json', () => {
            expect(result.json).to.be.true;
        });
    });
});
