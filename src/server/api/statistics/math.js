export function sumData(array, key) {
    return array.reduce((total, current) => total + current[key], 0);
}

export function averageData(array, key) {
    return sumData(array, key) / array.length;
}
