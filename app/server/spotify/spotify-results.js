const debug = require('debug')('spotify-results');
const SpotifyResults = function(){};

const resultsType = {
  ARTISTS : 'artists', 
  TRACKS : 'tracks'
}

SpotifyResults.prototype = function(){
  return {  
    resultsType,
    createResultsObject,
    getRelevantData
  }
}();

module.exports = new SpotifyResults();

function createResultsObject(){
  return{
    topTracks : {
      fourWeeks : null, 
      sixMonths : null, 
      allTime : null, 
    },
    topArtists : {
      fourWeeks : null, 
      sixMonths : null, 
      allTime : null
    }
  }
}
 
function getRelevantData(obj, type){
  // let results = [];  
  // for(let outerKey in obj) {
  //   for(let innerKey in obj[outerKey]) {
  //       if (obj.hasOwnProperty(key)) {
  //           let currentObj = obj[key];
  //           let currentData = type === resultsType.ARTISTS ? 
  //           _processArtistData(currentObj) : _processTrackData(currentObj);
  //           results.push(currentData);
  //       }
  //       else{
  //           console.logerror('missing artist data');
  //       }
  //   }
  // }
  // return results; 

	return Object.assign(...Object.keys(obj).map((outerKey) => {
    // return {[oK] : obj[oK]};	
    let value = Object.assign(...Object.keys(obj[outerKey]).map((innerKey) => {
      let currentObj = obj[outerKey][innerKey];
      let processedObj = type === resultsType.ARTISTS ? 
      _processArtistData(currentObj) : _processTrackData(currentObj);
      return {[innerKey] : processedObj};	
    })); 
		return {[outerKey] : value}
	}))


  // uses map to access each object value, then an inner map to access each child value. 
  // this inner child obj is then transformed to create a new object that, once the loop has completed, 
  // is passed up the return chain to give an array // of object results   
  // return Object.keys(obj).map((key) => {
  //   return Object.keys(obj[key]).map((innerKey) => {
  //     let currentObj = obj[key][innerKey];
  //     return (type === resultsType.ARTISTS ? _processArtistData(currentObj) : _processTrackData(currentObj));
  //   });
  // })
}

function _processTrackData(obj){
  return {
    name : obj.name ? obj.name : null,
    uri : obj.uri ? obj.uri : null,    
    popularity : obj.popularity ? obj.popularity : null,
    image : obj.album ? (obj.album.images ? _getCorrectImageUrl(obj.album.images) : null) : null // 640 x 640 image
    }
}

function _processArtistData(obj){
  return {
      name : obj.name ? obj.name : null,
      popularity : obj.popularity ? obj.popularity : null,
      genres : obj.genres ? _getGenres(obj.genres) : null,
      uri : obj.uri ? obj.uri : null,
      image : obj.images ? _getCorrectImageUrl(obj.images) : null // 640 x 640 image
  }
}

function _getCorrectImageUrl(images){
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
}

function _getGenres(genres){
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
}