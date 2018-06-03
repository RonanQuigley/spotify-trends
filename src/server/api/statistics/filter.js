/* filter an array objects inside each time period */
export function filterArrayOfObj(array, filterer) {
    return array.map(obj => {
        return filterObj(obj, filterer);
    });
}

/* filters each obj inside each time 
period we are working with for the data 
that we are looking for */
export function filterObj(obj, filterer) {
    return Object.keys(obj)
        .filter(key => filterer.includes(key))
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
}
