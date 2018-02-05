import spotifyResults from '..//spotify/spotify-results'; 
import spotifyApi from '..//spotify/spotify-api';
import Debug from 'debug';
import utilities from '../utilities';
import PieChart from '../../react/react';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Tally from '../spotify/tally';
import MeanStatistics from '../spotify/mean';

const resultsType = spotifyResults.resultsType;
const requestType = spotifyApi.requestType;
const numOfTopArtistsResults = 50; // max of 50
const numOfTopSongsResults = 50; // max of 50
const topTracksOffset = 0; // results offset
const topArtistsOffset = 0; // results offset
const debug = Debug('resultsdebug');



class Results {

  static getTokensFromClient(req, res, next){
    debug("querystring is: " + req.query);
    let accessToken = req.query ? req.query.access_token : req.headers.access_token;
    if (!accessToken) throw "no valid access token";
    res.locals.accessToken = accessToken;
    next();
  }
  static requestSpotifyData(req, res, next) {
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
  static processSpotifyData(req, res, next) {
    let results = res.locals.results;
    let accessToken = res.locals.accessToken;
    if (utilities.isObjectEmpty(results)) throw "spotifyResults object is empty";
    let topArtists = spotifyResults.getRelevantData(results.topArtists, resultsType.ARTISTS);
    let topTracks = spotifyResults.getRelevantData(results.topTracks, resultsType.TRACKS);
    spotifyApi.getAudioFeatures(accessToken, results.topTracks, (audioFeatures) => {    
      let statistics = spotifyResults.getStatistics(audioFeatures, ["key", "mode"]);
      const meanStatistics = new MeanStatistics();
      let other = meanStatistics.getMean(audioFeatures, MeanStatistics.types);
      let pitchClassAllTime = ReactDOM.renderToString(<PieChart keySignatures={statistics.allTime.key} timeRangeLabel="All Time" x="pitchClass" y="tally"/>);
      let pitchClassFourWeeks = ReactDOM.renderToString(<PieChart keySignatures={statistics.sixMonths.key} timeRangeLabel="Six Months" x="pitchClass" y="tally"/>);
      let pitchClassSixMonths = ReactDOM.renderToString(<PieChart keySignatures={statistics.fourWeeks.key} timeRangeLabel="Four Weeks" x="pitchClass" y="tally"/>);
      let modalityFourWeeks = ReactDOM.renderToString(<PieChart keySignatures={statistics.fourWeeks.mode} timeRangeLabel="Four Weeks" x="mode" y="tally"/>);
      let modalitySixMonths = ReactDOM.renderToString(<PieChart keySignatures={statistics.sixMonths.mode} timeRangeLabel="Six Months" x="mode" y="tally"/>);
      let modalityAllTime = ReactDOM.renderToString(<PieChart keySignatures={statistics.allTime.mode} timeRangeLabel="All Time" x="mode" y="tally"/>);
      let Spotify = {
        topArtists,
        topTracks,
      }
      let ReactApps = {
        pitchClassAllTime,
        pitchClassFourWeeks,
        pitchClassSixMonths,
        modalityFourWeeks,
        modalitySixMonths,
        modalityAllTime,

      }         
      res.locals.results = {      
        Spotify,
        statistics, 
        ReactApps, 
        other
      };
      next();
    });
  }
  static renderResultsPage(req, res, next) {
    let results = res.locals.results; 
    let Spotify = results.Spotify;
    let ReactApps = results.ReactApps;
    res.render("results", {
      Spotify, 
      ReactApps, 
      other : results.other
    });
  }
}

export default Results;