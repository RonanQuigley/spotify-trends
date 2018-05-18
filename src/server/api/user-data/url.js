export const endpoints = {
    ARTISTS: 'artists',
    TRACKS: 'tracks'
};

export const timeRange = {
    SHORT: 'short_term',
    MEDIUM: 'medium_term',
    LONG: 'long_term'
};

export function generateUrl(endpoint, timeRange) {
    return `https://api.spotify.com/v1/me/top/${endpoint}?time_range=${timeRange}`;
}
