export const endpoints = {
    ARTISTS: 'artists',
    TRACKS: 'tracks'
};

export const timeRanges = {
    SHORT: 'short_term',
    MEDIUM: 'medium_term',
    LONG: 'long_term'
};

export function generatePersonalDataUrl(endpoint, timeRange, limit) {
    return `https://api.spotify.com/v1/me/top/${endpoint}?time_range=${timeRange}&limit=3&offset=30`;
}

export function generateAudioFeaturesUrl(ids) {
    return `https://api.spotify.com/v1/audio-features?ids=${ids}`;
}
