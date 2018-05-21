const types = {
    LOUDNESS: 'loudness',
    ENERGY: 'energy',
    DANCEABILITY: 'danceability',
    VALENCE: 'valence',
    ACOUSTICNESS: 'acousticness'
};

export function processMean(tracks) {
    let results = {};
    for (const timeRange in tracks) {
        results[timeRange] = Object.assign(
            ...Object.keys(types).map(type => {
                const data = getData(tracks[timeRange], types[type]);
                const mean = calculateMean(data, types[type]);
                return {
                    [type]: mean
                };
            })
        );
    }
    return results;
}

function getData(tracks, type) {
    return Object.keys(tracks).map(key => {
        return tracks[key][type];
    });
}

function calculateMean(array, type) {
    return (
        array.reduce((accumulator, current) => accumulator + current) /
        array.length
    );
}
