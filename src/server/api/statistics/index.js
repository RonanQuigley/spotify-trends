import { countKeys, averageKeys } from './keys';
import { countData } from './count';
import { filterArrayOfObj } from './filter';
import { averageData } from './math';
import format from './formatter';

const calcType = {
    SUM: 'calculates the sum',
    AVERAGE: 'calculates the average'
};

export function getStatistics(tracks) {
    const statistics = Object.assign(
        ...Object.keys(tracks).map(timeRange => {
            return {
                [timeRange]: processTracks(tracks[timeRange])
            };
        })
    );
    return format(statistics);
}

function processTracks(array) {
    const average = filterArrayOfObj(array, averageKeys);
    const count = filterArrayOfObj(array, countKeys);
    return {
        average: calculateResults(average, averageKeys, calcType.AVERAGE),
        tally: calculateResults(count, countKeys, calcType.SUM)
    };
}

function processTracks(array) {
    const average = filterArrayOfObj(array, averageKeys);
    const count = filterArrayOfObj(array, countKeys);
    return {
        average: calculateResults(average, averageKeys, calcType.AVERAGE),
        tally: calculateResults(count, countKeys, calcType.SUM)
    };
}

function calculateResults(array, filterer, type) {
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
        return averageData(array, filter);
    } else {
        return countData(array, filter);
    }
}
