module.exports = {
    getAllArtists: function(obj) {
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
    getAllSongs : function(obj){
      var songs = [];    
      for(let key in obj) {
          if (obj.hasOwnProperty(key)) {
              var currentObj = obj[key];
              var currentSong = this._getRelevantSongData(currentObj);
              songs.push(currentSong);
          }
          else{
              console.logerror('missing songs data');
          }
      }
      return songs; 
    },
    calculateTopGenres: function() {},
    _getRelevantSongData : function(obj){
      return {
        name : obj.name ? obj.name : null,
        uri : obj.uri ? obj.uri : null,    
        popularity : obj.popularity ? obj.popularity : null,
        image : obj.album ? (obj.album.images ? 
          this._getCorrectImageUrl(obj.album.images) : null) : null // 640 x 640 image
        }
    },
    _getRelevantArtistData : function(obj){
      return {
          name : obj.name ? obj.name : null,
          popularity : obj.popularity ? obj.popularity : null,
          genres : obj.genres ? this._getGenres(obj.genres) : null,
          uri : obj.uri ? obj.uri : null,
          image : obj.images ? this._getCorrectImageUrl(obj.images) : null // 640 x 640 image
      }
    },
    _getCorrectImageUrl(images){
      // the image array size is inconsitent between artists
      // so we need to keep checking for the right sized match 
      for(let i = 0; i < images.length; i++){
        if(parseInt(images[i].width, 10) === 640) {
          return images[i].url;
        }
        else if(i === images.length - 1){
          return images[0].url // just return the largest image 
        }
      }
    },
    _getGenres : function(genres){
      // if(genres.length === 0){
      //   return genres[0];
      // }
      // else{
      //   // get a random genre 
      //   var rand = Math.floor(Math.random() * genres.length);
      //   genres.length[re]
      // }      
      // just return the first genre for now
      return genres[0];
    },
  };
  