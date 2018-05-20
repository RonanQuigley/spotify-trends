import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rp from 'request-promise';
import { fakeTokens } from 'fixtures/authentication/index';
import { fakeUrl, fakeOptions } from 'fixtures/spotify/data-access';
import fakeTopTracks from 'fixtures/spotify/processed-data/tracks';
import * as Url from 'src/server/api/user-data/url';
import chaiAsPromised from 'chai-as-promised';
import * as requestHandler from 'src/server/api/user-data/request-handler';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - user data', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('personal data request', () => {
        let result;
        let jsonSpy;
        beforeEach(async () => {
            const spy = sandbox.spy(() => {
                return fakeOptions;
            });
            requestHandler.rewire$generateOptions(spy);
            jsonSpy = sandbox.spy(async () => {
                return {};
            });
            sandbox
                .stub(rp, 'get')
                .callsFake(async options => {})
                .resolves({
                    data: 'fake'
                });
            sandbox.spy(Url, 'generatePersonalDataUrl');
            result = await requestHandler.requestPersonalData(
                fakeTokens.accessToken,
                fakeUrl
            );
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('should create the authorisation details for every request', () => {
            expect(requestHandler.generateOptions).callCount(6);
        });
        it('should perform a get request for every request', () => {
            expect(rp.get).callCount(6);
        });
        it('should generate a url for every request', () => {
            expect(Url.generatePersonalDataUrl).callCount(6);
        });
    });

    describe('audio features request', () => {
        let result;
        beforeEach(async () => {
            sandbox
                .stub(rp, 'get')
                .callsFake(async options => {})
                .resolves({
                    audio_features: {}
                });
            result = await requestHandler.requestAudioFeatures(
                fakeTokens.accessToken,
                fakeTopTracks.tracks
            );
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });
});
