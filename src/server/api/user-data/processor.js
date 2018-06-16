function getImageURL(images) {
    // return the second smallest image
    return images[images.length - 2].url;

    /* the image array size is inconsitent between artists
    so we need to keep checking for the right sized match.
    the largest size is 640 x 640 */
    // for (let i = 0; i < images.length; i++) {
    //     if (parseInt(images[i].width, 10) === 640) {
    //         return images[i].url;
    //     } else if (i === images.length - 1) {
    //         /* return the largest image that is available */
    //         return images[0].url;
    //     }
    // }
}

function getTrackData(obj) {
    let image;
    if (obj.album && obj.album.images) {
        image = getImageURL(obj.album.images);
    } else {
        image = null;
    }

    return {
        name: obj.name ? obj.name : null,
        uri: obj.uri ? obj.uri : null,
        popularity: obj.popularity ? obj.popularity : null,
        id: obj.id ? obj.id : null,
        image: image
    };
}

function getArtistData(obj) {
    return {
        name: obj.name ? obj.name : null,
        popularity: obj.popularity ? obj.popularity : null,
        genres: obj.genres ? obj.genres[0] : null,
        uri: obj.uri ? obj.uri : null,
        image: obj.images ? getImageURL(obj.images) : null
    };
}

const dataType = {
    TRACKS: 'tracks',
    ARTISTS: 'artists'
};

function getRelevantData(rawData, type) {
    let result = {};
    for (const timeRange in rawData) {
        const items = rawData[timeRange].items;
        let arr = [];
        for (const index in items) {
            const currentRawData = items[index];
            switch (type) {
                case dataType.ARTISTS:
                    arr[index] = getArtistData(currentRawData);
                    break;
                case dataType.TRACKS:
                    arr[index] = getTrackData(currentRawData);
                    break;
            }
        }
        result[timeRange] = arr;
    }
    return result;
}

export default function processData(rawData) {
    let result = {};
    // type is either artists or tracks
    for (const type in rawData) {
        result[type] = getRelevantData(rawData[type], type);
    }
    return result;
}
