function old(obj) {
    return Object.assign(
        ...Object.keys(obj).map(outerKey => {
            let value = Object.assign(
                ...Object.keys(obj[outerKey]).map(innerKey => {
                    let currentObj = obj[outerKey][innerKey];
                    let processedObj = null;
                    switch (type) {
                        case this.resultsType.ARTISTS:
                            processedObj = _processArtistData(currentObj);
                            return { [innerKey]: processedObj };
                        case this.resultsType.TRACKS:
                            processedObj = _processTrackData(currentObj);
                            return { [innerKey]: processedObj };
                    }
                })
            );
            return { [outerKey]: value };
        })
    );
}

export function getRelevantData(array) {
    let result = [];
    console.log(array);
    return [];
}
