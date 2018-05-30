export function setupProps(data, id, header) {
    return {
        data: data,
        id: id,
        header: header
    };
}

export const id = {
    TRACKS: 'tracks',
    ARTISTS: 'artists'
};

export const header = {
    ARTISTS: 'Top Artists',
    TRACKS: 'Top Tracks'
};
