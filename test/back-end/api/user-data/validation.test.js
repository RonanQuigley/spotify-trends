import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Validation from 'src/server/api/user-data/validation';
import emptyUserData from 'fixtures/spotify/raw-data/empty';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - validation', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('is user data empty', () => {
        describe('is empty', () => {
            let result;
            beforeEach(() => {
                result = Validation.isUserDataEmpty(emptyUserData);
            });
            it('should return true correctly', () => {
                expect(result).to.equal(true);
            });
        });
        describe('is not empty', () => {
            it('should return false correctly', () => {});
        });
    });
});
