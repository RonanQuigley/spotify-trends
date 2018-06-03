import { formatKeys } from './keys';
import { countKeys } from './keys';

/* TO DO - Rewrite: Ideally this whole file would be combined into the 
original algorithm, but to make things simpler initially we'll 
just keep the formatting phase of the data as a separate step. 
*/

export default function formatResults(obj) {
    return {
        average: collectAvgResults(obj),
        tally: collectTallyResults(obj)
    };
}

function collectAvgResults(obj) {
    return Object.assign(
        {},
        ...Object.keys(obj).map(timeRange => {
            return {
                [timeRange]: obj[timeRange][formatKeys.AVERAGE]
            };
        })
    );
}

function collectTallyResults(obj) {
    return Object.assign(
        {},
        ...countKeys.map(key => {
            return {
                [key]: collectTimeRanges(obj, key)
            };
        })
    );
}

function collectTimeRanges(obj, filter) {
    return Object.assign(
        {},
        ...Object.keys(obj).map(timeRange => {
            return {
                [timeRange]: collectTalliedValues(
                    obj[timeRange][formatKeys.TALLY],
                    filter
                )
            };
        })
    );
}

function collectTalliedValues(obj, filter) {
    return Object.assign(
        {},
        ...Object.keys(obj).map(() => {
            return obj[filter];
        })
    );
}
