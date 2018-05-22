import { timeRanges } from 'src/server/api/user-data/url';
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
    MEAN: 'calculates the mean'
};

const meanKeys = [
    'loudness',
    'energy',
    'danceability',
    'valence',
    'acousticness'
];

const tallyKeys = ['mode', 'key'];

export function getStatistics(tracks) {
    const result = Object.assign(
        ...Object.keys(tracks).map(timeRange => {
            return {
                [timeRange]: calculateStatistics(tracks[timeRange])
            };
        })
    );
    console.log(util.inspect(result, { showHidden: false, depth: null }));
}

function calculateStatistics(array) {
    return {
        MEAN: processCalculation(array, meanKeys, calcType.MEAN),
        TALLY: processCalculation(array, tallyKeys, calcType.SUM)
    };
}

function processCalculation(array, filterer, type) {
    const data = filterData(array, filterer);
    return calculateData(data, filterer, type);
}

function calculateData(array, filterer, type) {
    return Object.assign(
        ...filterer.map(filter => {
            return {
                [filter]: calculate(array, filter, type)
            };
        })
    );
}

function calculate(array, filter, type) {
    if (type === calcType.MEAN) {
        return mean(array, filter);
    } else {
        return tally(array, filter);
    }
}

function tally(array, key) {
    const values = getValuesToTally(array, key);
    if (key === 'mode') {
        return getModeTally(values, key);
    } else {
        return getKeySignatureTally(values, key);
    }
}

function getValuesToTally(array, key) {
    return array.map(obj => obj[key]);
}

function getModeTally(array, key) {
    // from spotify: major = 1, minor = 0
    return {
        major: tallyMode(array, 1),
        minor: tallyMode(array, 0)
    };
}

function tallyMode(array, mode) {
    // mode is either major or minor - 1 or 0
    return array.filter(elem => elem === mode).length;
}

function getKeySignatureTally(array) {
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

function filterData(array, filterer) {
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
