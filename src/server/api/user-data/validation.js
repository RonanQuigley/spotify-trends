import { timeRanges } from 'src/server/api/user-data/url';
import { deepCopy } from 'src/server/utilities';

export function isUserValid(obj) {
    return Object.keys(obj).every(key => {
        return !isObjectEmpty(obj[key]);
    });
}

export function findInvalidData(obj) {
    // avoid mutating the original object
    // this is a must for our unit tests
    let newObj = deepCopy(obj);
    searchForInvalid(newObj.artists);
    if (!isDataIntact(newObj.artists)) {
        const deletionKeys = getDeletionKeys(newObj.artists);
        /* use the acquired deletion key(s) to delete properties 
        from the tracks data that we will not be using */
        removeUnusedData(newObj.tracks, deletionKeys);
    }
    return newObj;
}

function getDeletionKeys(obj) {
    /* return the keys that we need to use to delete 
    object properties with */
    return Object.keys(timeRanges).filter(key => {
        return !obj[key];
    });
}

function removeUnusedData(obj, deletionKeys) {
    deletionKeys.forEach(key => delete obj[key]);
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function isDataIntact(obj) {
    /* check if anything been deleted by comparing the key length */
    return Object.keys(obj).length === Object.keys(timeRanges).length;
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function belowThreshold(obj) {
    return obj.total <= 2;
}

function searchForInvalid(obj) {
    // recursively delete the items that we don't need.
    return Object.keys(obj).forEach(key => {
        if (isObject(obj[key])) {
            if (belowThreshold(obj[key])) {
                // invalid : delete it
                delete obj[key];
            } else {
                searchForInvalid(obj[key]);
            }
        }
    });
}
