import { countKeys, averageKeys } from './keys';
import { countData } from './count';
import { filterArrayOfObj } from './filter';
import { map, averageData } from './math';
import format from './formatter';

const calcType = {
    SUM: 'calculates the sum',
    AVERAGE: 'calculates the average'
};

const min = -60;
const max = 0;
const outMin = 0;
const outMax = 1;

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
        const averageValue = averageData(array, filter);
        /* TO DO : CONVERT AVERAGE KEYS INTO OBJECT.
        THAT WAY WE CAN CONTINUE TO USE IT FOR THIS CHECK */
        if (filter === 'loudness') {
            /* https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
            loudness has a typical range of -60 to 0. 
            map it to a range that is consistent with the rest 
            of the averaged data set. in the event that a user has 
            a loudness reading less than 60, we need to just clamp it.*/
            const clampedValue = Math.clamp(averageValue, min, max);
            return map(clampedValue, min, max, outMin, outMax);
        }
        return averageValue;
    } else {
        return countData(array, filter);
    }
}
