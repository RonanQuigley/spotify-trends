import { numToPitchClass } from './pitch-class';

export function countData(array, key) {
    const values = getValuesToCount(array, key);
    if (key === 'mode') {
        return getModeCount(values, key);
    } else {
        return getKeySignatureCount(values, key);
    }
}

function getValuesToCount(array, key) {
    return array.map(obj => obj[key]);
}

function getModeCount(array, key) {
    // from spotify: major = 1, minor = 0
    return {
        major: countMode(array, 1),
        minor: countMode(array, 0)
    };
}

function getKeySignatureCount(array) {
    return array.reduce((tally, value) => {
        const pitch = numToPitchClass(value);
        tally[pitch] = (tally[pitch] || 0) + 1;
        return tally;
    }, {});
}

function countMode(array, mode) {
    // mode is either major - 1 - or minor - 0
    return array.filter(elem => elem === mode).length;
}
