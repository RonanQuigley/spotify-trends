import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fakeAudioFeatures from 'fixtures/spotify/processed-data/audio-features';
import fakeStatistics from 'fixtures/spotify/processed-data/statistics';
import * as Statistics from 'src/server/api/statistics';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - statistics', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('calculating mean', () => {
        let result;
        beforeEach(() => {
            result = Statistics.getStatistics(fakeAudioFeatures);
        });
        it('should return a correctly formatted object', () => {
            expect(result).to.deep.equal(fakeStatistics);
        });
    });
});
