import Debug from 'debug';
import { currentId } from 'async_hooks';
import Tally from './tally';

const debug = Debug()('spotify-results');

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
  return genres[0];
}

class SpotifyResults {

  static resultsType = {
    ARTISTS : 'artists', 
    TRACKS : 'tracks',
    FEATURES : {
      KEYSIG : 'key signature',    
    }
  }

  static createResultsObject(){
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
   
  static getRelevantData(obj, type){
    return Object.assign(...Object.keys(obj).map((outerKey) => {
      let value = Object.assign(...Object.keys(obj[outerKey]).map((innerKey) => {
        let currentObj = obj[outerKey][innerKey];
        let processedObj = null;
        switch(type){
          case this.resultsType.ARTISTS :
            processedObj = _processArtistData(currentObj);
            return {[innerKey] : processedObj};	
          case this.resultsType.TRACKS : 
            processedObj = _processTrackData(currentObj);
            return {[innerKey] : processedObj};	
        }
      })); 
      return {[outerKey] : value}
    }))
  }

  static getStatistics(obj, type, outputFormat){
    switch(type){
      case this.resultsType.FEATURES.KEYSIG : 
        return Tally.tallyObjValue(obj, "key");
    }    
  }
}

export default SpotifyResults;