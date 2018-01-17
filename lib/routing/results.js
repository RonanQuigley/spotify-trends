const spotifyResults = require('../spotify-results');
const resultsType = spotifyResults.resultsType;
const spotifyApi = require('../spotify-api');
const debug = require('debug')('resultsdebug');
const utilities = require('../utilities');
const numOfTopArtistsResults = 1; // max of 50
const numOfTopSongsResults = 1; // max of 50
const topTracksOffset = 0; // results offset
const topArtistsOffset = 0; // results offset

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
  spotifyApi.getTopArtists(accessToken, numOfTopArtistsResults, topArtistsOffset, topArtistsResults => {
      results.topArtists.fourWeeks = topArtistsResults.fourWeeks;
      results.topArtists.sixMonths = topArtistsResults.sixMonths;
      results.topArtists.allTime = topArtistsResults.allTime;
      if (requestsCompleted()) callNext();
    }
  );
  spotifyApi.getTopTracks(accessToken, numOfTopSongsResults, topTracksOffset, topTracksResults => {
      results.topTracks.fourWeeks = topTracksResults.fourWeeks;
      results.topTracks.sixMonths = topTracksResults.sixMonths;
      results.topTracks.allTime = topTracksResults.allTime;
      if (requestsCompleted()) callNext();
    }
  );
}

Results.prototype.processSpotifyData = function(req, res, next) {
  let results = res.locals.results;
  if (utilities.isObjectEmpty(results)) throw "spotifyResults object is empty";
  res.locals.finalResults = {
    topArtists : spotifyResults.getRelevantData(results.topArtists, resultsType.ARTISTS),
    topTracks : spotifyResults.getRelevantData(results.topTracks, resultsType.TRACKS)
    // topArtistsFourWeeks: spotifyResults.getRelevantData(results.topArtists.fourWeeks, resultsType.ARTISTS),
    // topArtistsSixMonths: spotifyResults.getRelevantData(results.topArtists.sixMonths, resultsType.ARTISTS),
    // topArtistsAllTime: spotifyResults.getRelevantData(results.topArtists.allTime, resultsType.ARTISTS),
    // topTracksFourWeeks: spotifyResults.getRelevantData(results.topTracks.fourWeeks, resultsType.TRACKS),
    // topTracksSixMonths: spotifyResults.getRelevantData(results.topTracks.sixMonths, resultsType.TRACKS),
    // topTracksAllTime: spotifyResults.getRelevantData(results.topTracks.allTime, resultsType.TRACKS)
  };
  next();
}

Results.prototype.renderResultsPage = function(req, res, next) {
  let finalResults = res.locals.finalResults;
  res.render("results", {
    Spotify: {
      topArtistsFourWeeks: finalResults.topArtistsFourWeeks,
      topArtistsSixMonths: finalResults.topArtistsSixMonths,
      topArtistsAllTime: finalResults.topArtistsAllTime,
      topTracksFourWeeks: finalResults.topTracksFourWeeks,
      topTracksSixMonths: finalResults.topTracksSixMonths,
      topTracksAllTime: finalResults.topTracksAllTime
    }
  });
}

module.exports = new Results();