export default {
    artists: {
        SHORT: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            previous: null,
            href:
                'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=short_term',
            next: null
        },
        MEDIUM: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            previous: null,
            href: 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0',
            next: null
        },
        LONG: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            href:
                'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=long_term',
            previous: null,
            next: null
        }
    },
    tracks: {
        SHORT: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            href:
                'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=short_term',
            previous: null,
            next: null
        },
        MEDIUM: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            href: 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0',
            previous: null,
            next: null
        },
        LONG: {
            items: [],
            total: 0,
            limit: 50,
            offset: 0,
            href:
                'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=long_term',
            previous: null,
            next: null
        }
    }
};
