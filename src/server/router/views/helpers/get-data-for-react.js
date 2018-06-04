export default props => {
    return JSON.stringify({
        artists: props.artists,
        tracks: props.tracks,
        mode: props.mode,
        key: props.key,
        average: props.average
    });
};
