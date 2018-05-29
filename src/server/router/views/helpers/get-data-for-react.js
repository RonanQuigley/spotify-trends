export default data => {
    return JSON.stringify({
        tracks: data.tracks,
        artists: data.artists,
        statistics: data.statistics
    });
};
