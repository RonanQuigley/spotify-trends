export default {
    average: {
        SHORT: {
            loudness: 0.5757,
            energy: 0.10396666666666667,
            danceability: 0.09736666666666667,
            valence: 0.02706666666666667,
            acousticness: 0.6378333333333334
        },
        MEDIUM: {
            loudness: 0.7106222222222222,
            energy: 0.21946666666666667,
            danceability: 0.22273333333333334,
            valence: 0.19433333333333333,
            acousticness: 0.4776666666666667
        },
        LONG: {
            loudness: 0.5992833333333333,
            energy: 0.09363333333333333,
            danceability: 0.15966666666666665,
            valence: 0.03233333333333333,
            acousticness: 0.503
        }
    },
    tally: {
        mode: {
            SHORT: { major: 1, minor: 2 },
            MEDIUM: { major: 2, minor: 1 },
            LONG: { major: 3, minor: 0 }
        },
        key: {
            SHORT: { G: 1, 'G#': 1, F: 1 },
            MEDIUM: { 'C#': 2, F: 1 },
            LONG: { C: 2, 'D#': 1 }
        }
    }
};
