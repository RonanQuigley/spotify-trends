import spotifyResults from '..//spotify/spotify-results'; 
import spotifyApi from '..//spotify/spotify-api';
import Debug from 'debug';
import utilities from '../utilities';
import App from '../../react/react';
import React from 'react';
import ReactDOM from 'react-dom/server';

const resultsType = spotifyResults.resultsType;
const requestType = spotifyApi.requestType;
const numOfTopArtistsResults = 50; // max of 50
const numOfTopSongsResults = 50; // max of 50
const topTracksOffset = 0; // results offset
 const topArtistsOffset = 0; // results offset
const debug = Debug('resultsdebug');
const Results = function() {};

Results.prototype.getTokensFromClient = function(req, res, next){
  debug("querystring is: " + req.query);
  let accessToken = req.query ? req.query.access_token : req.headers.access_token;
  if (!accessToken) throw "no valid access token";
  res.locals.accessToken = accessToken;
  next();
}

Results.prototype.requestSpotifyData = function(req, res, next) {
  let results = spotifyResults.createResultsObject();
  // IF YOU CHANGE THE RESULTS SIZE WHEN TESTING YOU MAY GET
  // A 'CAN'T SET HEADERS AFTER THEY ARE SENT TO THE CLIENT' ERROR
  const resultsSize = 2; // increase this based on the number of requests you are making
  let resultsCount = 0;
  const accessToken = res.locals.accessToken;
  const requestsCompleted = () => {
    return ++resultsCount === resultsSize;
  };
  const callNext = () => {
    res.locals.results = results;
    next();
  };  
  spotifyApi.getPersonalStats(accessToken, numOfTopArtistsResults, 
    topArtistsOffset, requestType.ARTISTS, topArtistsResults => {
      results.topArtists.fourWeeks = topArtistsResults.fourWeeks;
      results.topArtists.sixMonths = topArtistsResults.sixMonths;
      results.topArtists.allTime = topArtistsResults.allTime;
      if (requestsCompleted()) callNext();
    }
  );
  spotifyApi.getPersonalStats(accessToken, numOfTopSongsResults, 
    topTracksOffset, requestType.TRACKS, topTracksResults => {
      results.topTracks.fourWeeks = topTracksResults.fourWeeks;
      results.topTracks.sixMonths = topTracksResults.sixMonths;
      results.topTracks.allTime = topTracksResults.allTime;
      if (requestsCompleted()) callNext();
    }
  );
}

Results.prototype.processSpotifyData = function(req, res, next) {
  let results = res.locals.results;
  let accessToken = res.locals.accessToken;
  if (utilities.isObjectEmpty(results)) throw "spotifyResults object is empty";
  let topArtists = spotifyResults.getRelevantData(results.topArtists, resultsType.ARTISTS);
  let topTracks = spotifyResults.getRelevantData(results.topTracks, resultsType.TRACKS);
  spotifyApi.getAudioFeatures(accessToken, results.topTracks, (audioFeatures) => {        
    res.locals.results = {      
      topArtists : topArtists,
      topTracks : topTracks, 
    };
    next();
  });
}


Results.prototype.renderResultsPage = function(req, res, next) {
  let finalResults = res.locals.results;
  res.render("results", {
    Spotify: {
      topArtists : finalResults.topArtists,
      topTracks : finalResults.topTracks,
    }, 
    ReactApp : ReactDOM.renderToString(<App/>)
  });
}

module.exports = new Results();