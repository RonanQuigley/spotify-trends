import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Validation from 'src/server/api/user-data/validation';
import emptyData from 'fixtures/spotify/raw-data/empty';
import normalData from 'fixtures/spotify/raw-data/normal';
import partialData from 'fixtures/spotify/raw-data/partial';
import { deepCopy } from 'src/server/utilities';
chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();
const emptyResult = {
    artists: {},
    tracks: {}
};

describe('back end - api - validation', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('finding invalid data', () => {
        it('should return an object', () => {
            const result = Validation.findInvalidData(emptyData);
            expect(result).to.be.a('object');
        });
        describe('all data does not meet the threshold', () => {
            it('should return an empty set of artists and tracks', () => {
                const result = Validation.findInvalidData(emptyData);
                expect(result).to.deep.equal(emptyResult);
            });
        });
        describe('all data meets the threshold', () => {
            it('should return an object with the same values', () => {
                const result = Validation.findInvalidData(normalData);
                expect(result).to.deep.equal(normalData);
            });
        });
        describe('short term data does not meet the threshold', () => {
            it('should return an object with a correctly removed time range', () => {
                let expectation = deepCopy(partialData);
                delete expectation.artists.SHORT;
                delete expectation.tracks.SHORT;
                const result = Validation.findInvalidData(partialData);
                expect(result).to.deep.equal(expectation);
            });
        });
        describe("all tracks data meets the threshold but artists short term data does't", () => {
            it('should return an object with the corresponding data removed', () => {
                let expectation = deepCopy(partialData);
                // note - delete seems to clip mocha logging
                delete expectation.artists.SHORT;
                delete expectation.tracks.SHORT;
                /* what if the user listened to the same artist
                over and over ? like so: */
                partialData.artists.SHORT.total = 1;
                partialData.tracks.SHORT.total = 40;
                /* this edge case needs to be checked for */
                const result = Validation.findInvalidData(partialData);
                expect(result).to.deep.equal(expectation);
            });
        });
    });
    describe('is user valid', () => {
        it('should return false when a set of empty objects is used', () => {
            const result = Validation.isUserValid(emptyResult);
            expect(result).to.be.false;
        });
        it('should return true when a set of non-empty objects is used', () => {
            const data = Validation.findInvalidData(partialData);
            const result = Validation.isUserValid(data);
            expect(result).to.be.true;
        });
    });
});
