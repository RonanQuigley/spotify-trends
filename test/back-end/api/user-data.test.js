import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rp from 'request-promise';
import { fakeTokens } from '../../fixtures/authentication/index';
import { fakeUrl, fakeOptions } from '../../fixtures/spotify/data-access';
import { fakeTopTracks } from '../../fixtures/spotify/tracks';
import chaiAsPromised from 'chai-as-promised';
import * as UserData from '../../../src/server/api/user-data';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - user data', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('data request', () => {
        let result;
        let jsonSpy;
        beforeEach(async () => {
            const spy = sandbox.spy(() => {
                return fakeOptions;
            });
            UserData.rewire$_generateOptions(spy);
            jsonSpy = sandbox.spy(async () => {
                return {};
            });
            sandbox
                .stub(rp, 'get')
                .callsFake(async options => {})
                .resolves(fakeTopTracks);
            result = await UserData.requestData(
                fakeTokens.accessToken,
                fakeUrl
            );
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should create the authorisation details', () => {
            expect(UserData._generateOptions).to.be.calledWith(
                fakeTokens.accessToken,
                fakeUrl
            ).calledOnce;
        });
        it('should perform a get request', () => {
            expect(rp.get).to.be.calledWith(fakeOptions).calledOnce;
        });
    });
});
