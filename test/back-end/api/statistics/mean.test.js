import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import fakeAudioFeatures from 'fixtures/spotify/processed-data/audio-features';
import fakeMean from 'fixtures/spotify/processed-data/mean';
import * as Mean from 'src/server/api/statistics/mean';
chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - statistics - mean', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('calculating mean', () => {
        let result;
        beforeEach(() => {
            result = Mean.processMean(fakeAudioFeatures, Mean.types);
        });
        it('should return an object', () => {
            expect(result).to.deep.equal(fakeMean);
        });
    });
});
