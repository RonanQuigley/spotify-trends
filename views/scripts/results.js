var Results = {
  _getAllArtists: function(obj) {
    // Object.keys(obj).forEach(function(key) {
    //     console.log(key, obj[key]);
    // });
    var artists = [];    
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            var currentObj = obj[key];
            var currentArtist = this._getRelevantArtistData(currentObj);
            artists.push(currentArtist);
        }
        else{
            console.logerror('missing artist data');
        }
    }
    return artists; 
  },
  _getRelevantArtistData : function(obj){
    return {
        name : obj.name,
        popularity : obj.popularity,
        genres : obj.genres,
        uri : obj.uri,
        popularity : obj.popularity,
        image : obj.images[1] // 320 x 320 - medium
    }
  },
  renderTopArtists: function(obj) {
    var artists = this._getAllArtists(obj);
    console.log(artists);
  },
  renderTopSongs: function(obj) {
    var parsedObj = JSON.parse(obj);
  }
};
