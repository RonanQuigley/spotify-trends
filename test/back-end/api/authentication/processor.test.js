import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import * as Processor from '../../../../src/server/api/user-data/processor';
import fakeSpotifyData from 'fixtures/spotify/data-response';
chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - processor', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('get relevant data', () => {
        let result;
        beforeEach(() => {
            result = Processor.getRelevantData(fakeSpotifyData);
        });
        it('should return an array', () => {
            expect(result).to.be.a('array');
        });
    });
});
