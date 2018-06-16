export function isUserDataEmpty(obj) {
    return Object.keys(obj)
        .map(type => {
            return Object.keys(obj[type]).every(timeRange => {
                return obj[type][timeRange].total === 0;
            });
        })
        .every(bool => bool === true);
}
