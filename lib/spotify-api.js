const queryString = require("querystring");
const debug = require("debug")("spotifydebug:");
const request = require("request");
const util = require("util");
const utilities = require("./utilities");
const clientID = process.env.CLIENT_ID; // Your client id
const clientSecret = process.env.CLIENT_SECRET; // Your secret
const port = process.env.PORT;

const SpotifyApi = function(){

  const redirectURI = "http://localhost:" + port + "/callback";
  const headerType = {
    LOGIN: "generate-tokens",
    DATAREQ: "request-spotify-data",
    REFRESH: "refresh-access-token"
  };  

  const Results = function(){
    this.fourWeeks =  null;
    this.sixMonths =  null;
    this.allTime = null;
  };

  const timeRange = {
    SHORT: "short_term", // last 4 weeks
    MEDIUM: "medium_term", // approx last 6 months
    LONG: "long_term" // several years of data
  }

  const requestType = {
    TRACKS: "tracks",
    ARTISTS: "artists"
  };
  
  function requestTokens(authOptions, callback) {
    request.post(authOptions, (err, res, body) => {
      let result = utilities.validateReqCallback(err, res, body);
      if(result !== true) throw result; 
      let accessToken = body.access_token;
      if (!accessToken) throw "no access token";
      let refreshToken = body.refresh_token;
      if (!refreshToken) throw "no refresh token";
      let expiryIn = body.expires_in;
      if (!expiryIn) throw "no expires in time";
      callback({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiryIn: expiryIn
      });  
    });
  }
  
  function refreshAccessToken(authOptions, callback) {
    request.post(authOptions, (err, res, body) => {
      let result = utilities.validateReqCallback(err, res, body);
      if(result !== true) throw result; 
      let accessToken = body.access_token;
      if (!accessToken) throw "no access token";
      let expiryIn = body.expires_in;
      if (!expiryIn) throw "no expires in time";
      callback(accessToken, expiryIn);
    });
  }
  
  function generateAuthHeader(requestedType, authCode, url, token) {
    if (typeof requestedType !== "string")
      throw "header type is wrong; did you pass the object by mistake?";
    switch (requestedType) {
      case headerType.DATAREQ:
        return {
          url: url,
          headers: { Authorization: "Bearer " + token },
          json: true
        };
      case headerType.REFRESH:
        return {
          url: "https://accounts.spotify.com/api/token",
          headers: {
            Authorization:
              "Basic " +
              new Buffer(clientID + ":" + clientSecret).toString("base64")
          },
          form: {
            grant_type: "refresh_token",
            refresh_token: token
          },
          json: true
        };
      case headerType.LOGIN:
        return {
          url: "https://accounts.spotify.com/api/token",
          form: {
            code: authCode, // the authorizaton code string
            redirect_uri: this.redirectURI, // the callback uri
            grant_type: "authorization_code"
          },
          headers: {
            Authorization:
              "Basic " +
              new Buffer(clientID + ":" + clientSecret).toString("base64")
          },
          json: true
        };
    }
  }
  
  function generateQueryString(time, limit, offset) {
    if (!time) time = timeRange.SHORT;
    if (!limit) limit = 20;
    // can't use not with 0; would evaluate to true
    if (offset === undefined) offset = 0;
    return queryString.stringify({
      time_range: time,
      limit: limit,
      offset: offset
    });
  }
  
  function getTopArtists(accessToken, limit, offset, callback) {
    var storedResultsObj = new Results();
    let cb = onRequestCompleted.bind(callback, storedResultsObj);
    getRequest(accessToken, limit, offset, cb, requestType.ARTISTS);
  }
  
  function onRequestCompleted(storedResultsObj, timeRange, result){
    storeResults(result, storedResultsObj, timeRange);
    if (storedResultsObj.allTime && storedResultsObj.sixMonths && storedResultsObj.fourWeeks) {
      // send the results back up to the executing context callback function
      // it will either be results of topArtists or topTracks
      let sendResultsCallback = this;
      sendResultsCallback(storedResultsObj);
    }
  }

  function getTopTracks(accessToken, limit, offset, callback) {
    var storedResultsObj = new Results();
    let cb = onRequestCompleted.bind(callback, storedResultsObj);
    getRequest(accessToken, limit, offset, cb, requestType.TRACKS);
  }

  function storeResults(currentResult, resultsObj, time) {
    switch (time) {
      case timeRange.SHORT:
        resultsObj.fourWeeks = currentResult;
        break;
      case timeRange.MEDIUM:
        resultsObj.sixMonths = currentResult;
        break;
      case timeRange.LONG:
        resultsObj.allTime = currentResult;
        break;
    }
  }
  
  function getRequest(accessToken, limit, offset, callback, requestedDataType) {
    if (!requestedDataType) throw "get Request type is undefined";
    let timeRangeValues = Object.values(timeRange); 
    let createRequest = function(i) {
      let currentTimeRange = timeRangeValues[i];
      let queryString = "?" + generateQueryString(currentTimeRange, limit, offset);
      let url = "https://api.spotify.com/v1/me/top/" + requestedDataType + "" + queryString;
      let header = generateAuthHeader(headerType.DATAREQ, null, url, accessToken);
      debug("finalised header: " + header.headers);
      request.get(header, (err, res, body) => {
        let result = utilities.validateReqCallback(err, res, body);
        if(result !== true) throw result; 
        callback(currentTimeRange, body.items);          
      });
    }
    for (let i = 0; i <= 2; i++) {
      createRequest.call(this, i);
    }
  }

  return {
    redirectURI,
    headerType,
    requestTokens,
    refreshAccessToken,
    generateAuthHeader,
    generateQueryString,
    getTopArtists,
    getTopTracks
  }
}

module.exports = new SpotifyApi();
