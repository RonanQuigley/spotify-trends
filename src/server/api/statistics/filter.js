export function filterArrayOfObj(array, filterer) {
    return array.map(obj => {
        return filterObj(obj, filterer);
    });
}

export function filterObj(obj, filterer) {
    return Object.keys(obj)
        .filter(key => filterer.includes(key))
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
}
