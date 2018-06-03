export function setupProps(data, ssrID, header) {
    return {
        data: data,
        ssrID: ssrID,
        header: header
    };
}

export const header = {
    ARTISTS: 'Top Artists',
    TRACKS: 'Top Tracks'
};

export const styleID = {
    ARTISTS: 'jss-server-side-artists',
    TRACKS: 'jss-server-side-tracks',
    KEY: 'jss-server-side-key',
    MODE: 'jss-server-side-mode',
    AVERAGE: 'jss-server-side-average'
};
