// for scenarios where the user only has data from some time ranges
// note that the items in each time range are empty
// this is because we are only interested in evaluating
// the received total number from spotify
export default {
    artists: {
        SHORT: {
            items: [],
            total: 0,
            limit: 1,
            offset: 0,
            href:
                'https://api.spotify.com/v1/me/top/artists?limit=1&offset=0&time_range=short_term',
            previous: null,
            next:
                'https://api.spotify.com/v1/me/top/artists?limit=1&offset=1&time_range=short_term'
        },
        MEDIUM: {
            items: [],
            total: 3, // modified
            limit: 1,
            offset: 0,
            href: 'https://api.spotify.com/v1/me/top/artists?limit=1&offset=0',
            previous: null,
            next: 'https://api.spotify.com/v1/me/top/artists?limit=1&offset=1'
        },
        LONG: {
            items: [],
            total: 3, // modified
            limit: 1,
            offset: 0,
            previous: null,
            href:
                'https://api.spotify.com/v1/me/top/artists?limit=1&offset=0&time_range=long_term',
            next:
                'https://api.spotify.com/v1/me/top/artists?limit=1&offset=1&time_range=long_term'
        }
    },
    tracks: {
        SHORT: {
            total: 0, // modified
            limit: 1,
            offset: 0,
            previous: null,
            href:
                'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=0&time_range=short_term',
            next:
                'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=1&time_range=short_term'
        },
        MEDIUM: {
            items: [],
            total: 3, // modified
            limit: 1,
            offset: 0,
            href: 'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=0',
            previous: null,
            next: 'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=1'
        },
        LONG: {
            items: [],
            total: 3, // modified
            limit: 1,
            offset: 0,
            previous: null,
            href:
                'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=0&time_range=long_term',
            next:
                'https://api.spotify.com/v1/me/top/tracks?limit=1&offset=1&time_range=long_term'
        }
    }
};
