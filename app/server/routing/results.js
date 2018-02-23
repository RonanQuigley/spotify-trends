import spotifyResults from '..//spotify/spotify-results'; 
import spotifyApi from '..//spotify/spotify-api';
import Debug from 'debug';
import utilities from '../utilities';

import React from 'react';
import ReactDOM from 'react-dom/server';
import Tally from '../spotify/tally';
import MeanStatistics from '../spotify/mean';


// react components 
// NEED TO UPDATE DIRECTORIES
// import KeySigContainer from '../../react/key-sig-container';
// import MeanContainer from '../../react/mean-container';
import ReactApp from '../../react/index';

const resultsType = spotifyResults.resultsType;
const requestType = spotifyApi.requestType;
const headerType = spotifyApi.headerType;
const numOfTopArtistsResults = 50; // max of 50
const numOfTopSongsResults = 50; // max of 50
const topTracksOffset = 0; // results offset
const topArtistsOffset = 0; // results offset
const debug = Debug('resultsdebug');

export default class Results {

  static getTokensFromClient(req, res, next){
    let accessToken = req.query ? req.query.access_token : req.headers.access_token;
    if (!accessToken) throw "no valid access token";
    spotifyApi.validateAccessToken(accessToken, (statusCode) => {
      if(statusCode === 401){
        let err = new Error(statusCode);
        return next(err);             
      }
      else{
        res.locals.accessToken = accessToken;
        return next();        
      }
    })
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
    let SpotifyData = {
      topArtists : spotifyResults.getRelevantData(results.topArtists, resultsType.ARTISTS),
      topTracks : spotifyResults.getRelevantData(results.topTracks, resultsType.TRACKS),
    }
    spotifyApi.getAudioFeatures(accessToken, results.topTracks, (audioFeatures) => {    
      // let statistics = spotifyResults.getStatistics(audioFeatures, ["key", "mode"]);
      // const meanStatistics = new MeanStatistics();      
      // let meanResults = meanStatistics.getMean(audioFeatures, MeanStatistics.types);    
      // let keySigContainer = ReactDOM.renderToString(<KeySigContainer statistics={statistics}/>);
      // let meanContainer = ReactDOM.renderToString(<MeanContainer/>) 

      let topTracks = ReactDOM.renderToString(<ReactApp data={SpotifyData.topTracks} id="topTracks"/>);
      let topArtists = ReactDOM.renderToString(<ReactApp data={SpotifyData.topArtists} id="topArtists"/>)
      let ReactApps = {
        topTracks,
        topArtists,
      }         
      res.locals.results = {      
        ReactApps, 
        SpotifyData
      };
      next();
    });
  }
  static renderResultsPage(req, res, next) {
    let results = res.locals.results; 
    let Spotify = results.Spotify;
    let ReactApps = results.ReactApps;
    // let meanResults = results.meanResults;
    res.render("results", {
      Spotify, 
      // meanResults,
      ReactApps,       
    });
    next();
  }
}