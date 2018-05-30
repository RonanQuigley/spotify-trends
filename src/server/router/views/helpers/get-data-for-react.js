export default props => {
    // return JSON.stringify({
    //     tracks: data.tracks,
    //     artists: data.artists,
    //     statistics: data.statistics,
    //     props: data.props
    // });
    return JSON.stringify({
        artists: props.artists,
        tracks: props.tracks
    });
};
