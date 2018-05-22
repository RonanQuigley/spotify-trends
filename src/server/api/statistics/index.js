import util from 'util';

const pitchClass = {
    C: 'C',
    'C#/Db': 'C#/Db',
    D: 'D',
    'D#/Eb': 'D#/Eb',
    E: 'E',
    F: 'F',
    'F#/Gb': 'F#/Gb',
    G: 'G',
    'G#/Ab': 'G#/Ab',
    A: 'A',
    'A#/Bb': 'A#/Bb',
    B: 'B'
};

const calcType = {
    SUM: 'calculates the sum',
    AVERAGE: 'calculates the mean'
};

const keysToAverage = [
    'loudness',
    'energy',
    'danceability',
    'valence',
    'acousticness'
];

const keysToCount = ['mode', 'key'];

export function getStatistics(tracks) {
    return Object.assign(
        ...Object.keys(tracks).map(timeRange => {
            return {
                [timeRange]: processTracks(tracks[timeRange])
            };
        })
    );
    // console.log(util.inspect(result, { showHidden: false, depth: null }));
}

function processTracks(array) {
    return {
        average: calculateValues(array, keysToAverage, calcType.AVERAGE),
        tally: calculateValues(array, keysToCount, calcType.SUM)
    };
}

function calculateValues(array, filterer, type) {
    const filteredData = filter(array, filterer);
    return setupResults(filteredData, filterer, type);
}

function setupResults(array, filterer, type) {
    return Object.assign(
        ...filterer.map(filter => {
            return {
                [filter]: calculate(array, filter, type)
            };
        })
    );
}

function calculate(array, filter, type) {
    if (type === calcType.AVERAGE) {
        return mean(array, filter);
    } else {
        return count(array, filter);
    }
}

function count(array, key) {
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

function countMode(array, mode) {
    // mode is either major - 1 - or minor - 0
    return array.filter(elem => elem === mode).length;
}

function getKeySignatureCount(array) {
    return array.reduce((tally, value) => {
        const pitch = numToPitchClass(value);
        tally[pitch] = (tally[pitch] || 0) + 1;
        return tally;
    }, {});
}

function numToPitchClass(num) {
    switch (num) {
        case 0:
            return 'C';
        case 1:
            return 'C#/Db';
        case 2:
            return 'D';
        case 3:
            return 'D#/Eb';
        case 4:
            return 'E';
        case 5:
            return 'F';
        case 6:
            return 'F#/Gb';
        case 7:
            return 'G';
        case 8:
            return 'G#/Ab';
        case 9:
            return 'A';
        case 10:
            return 'A#/Bb';
        case 11:
            return 'B';
    }
}

function sum(array, key) {
    return array.reduce((total, current) => total + current[key], 0);
}

function mean(array, key) {
    return sum(array, key) / array.length;
}

function filter(array, filterer) {
    return array.map(obj => {
        return filterObject(obj, filterer);
    });
}

function filterObject(obj, filterer) {
    return Object.keys(obj)
        .filter(key => filterer.includes(key))
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
}
