export function sumData(array, key) {
    return array.reduce((total, current) => total + current[key], 0);
}

export function averageData(array, key) {
    return sumData(array, key) / array.length;
}

export function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
