export function setupDevelopmentAssets(req, res, next) {
    /* if we're in development mode, the res.locals.data will
        not have been set up. we need to check for this. We also use dummy
        data to speed up dev so we're not continuosly making spotify server requests
    */
    const fakeData = require('fixtures/spotify/processed-data/small-payload')
        .default;
    res.locals.data = {
        userData: {
            artists: fakeData.artists,
            tracks: fakeData.tracks
        },
        statistics: fakeData.statistics
    };
    return next();
}
