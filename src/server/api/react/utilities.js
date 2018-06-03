export function setupProps(data, ssrID, header) {
    return {
        data: data,
        ssrID: ssrID,
        header: header
    };
}

export const headerID = {
    ARTISTS: 'Top Artists',
    TRACKS: 'Top Tracks',
    MODE: 'Major/Minor',
    KEY: 'Key Signatures',
    AVERAGE: 'Average Audio Features'
};

export const styleID = {
    ARTISTS: 'jss-server-side-artists',
    TRACKS: 'jss-server-side-tracks',
    KEY: 'jss-server-side-key',
    MODE: 'jss-server-side-mode',
    AVERAGE: 'jss-server-side-average'
};
