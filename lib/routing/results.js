var spotifyApi = require('./lib/spotify-results.js');

var Results = function() {};

Results.prototype.getTokensFromClient = function(req, res, next){
  debug("querystring is: " + req.query);
  let accessToken = req.query
    ? req.query.access_token
    : req.headers.access_token;
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
  let accessToken = res.locals.accessToken;
  let requestsCompleted = () => {
    return ++resultsCount === resultsSize;
  };
  let callNext = () => {
    res.locals.results = results;
    next();
  };
  spotifyApi.getTopArtists(
    accessToken,
    numOfTopArtistsResults,
    topArtistsOffset,
    topArtistsResults => {
      results.topArtists.fourWeeks = topArtistsResults.fourWeeks;
      results.topArtists.sixMonths = topArtistsResults.sixMonths;
      results.topArtists.allTime = topArtistsResults.allTime;
      if (requestsCompleted()) callNext();
    }
  );
  spotifyApi.getTopTracks(
    accessToken,
    numOfTopSongsResults,
    topTracksOffset,
    topTracksResults => {
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
  debug("stored results is of type: " + typeof results);
  res.locals.finalResults = {
    topArtistsFourWeeks: spotifyResults.getRelevantArtistsData(
      results.topArtists.fourWeeks
    ),
    topArtistsSixMonths: spotifyResults.getRelevantArtistsData(
      results.topArtists.sixMonths
    ),
    topArtistsAllTime: spotifyResults.getRelevantArtistsData(
      results.topArtists.allTime
    ),
    topTracksFourWeeks: spotifyResults.getRelevantTracksData(
      results.topTracks.fourWeeks
    ),
    topTracksSixMonths: spotifyResults.getRelevantTracksData(
      results.topTracks.sixMonths
    ),
    topTracksAllTime: spotifyResults.getRelevantTracksData(
      results.topTracks.allTime
    )
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