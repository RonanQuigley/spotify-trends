import { countKeys, averageKeys } from './keys';
import { countData } from './count';
import { filterArrayOfObj } from './filter';
import { averageData } from './math';

const calcType = {
    SUM: 'calculates the sum',
    AVERAGE: 'calculates the average'
};

export function getStatistics(tracks) {
    return Object.assign(
        ...Object.keys(tracks).map(timeRange => {
            return {
                [timeRange]: processTracks(tracks[timeRange])
            };
        })
    );
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
