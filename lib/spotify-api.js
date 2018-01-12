var queryString = require("querystring");
var debug = require("debug")("spotifydebug:");
var request = require("request");
var util = require("util");
var utilities = require("./utilities");
var clientID = process.env.CLIENT_ID; // Your client id
var clientSecret = process.env.CLIENT_SECRET ; // Your secret
var port = process.env.PORT;
module.exports = {
  _timeRange: {
    SHORT: "short_term", // last 4 weeks
    MEDIUM: "medium_term", // approx last 6 months
    LONG: "long_term" // several years of data
  },
  _requestType : {
    TRACKS : 'tracks', 
    ARTISTS : 'artists'
  },
  headerType : {
    LOGIN : 'generate-tokens',
    DATAREQ : 'request-spotify-data',
    REFRESH : 'refresh-access-token'
  },
  redirectURI : "http://localhost:" + port + "/callback", // Your redirect uri
  requestTokens : function(authOptions, callback){    
    request.post(authOptions, (err, response, body) => {
      if(err) throw err;
      if(response.statusCode !== 200) throw '' + response.statusCode;
      if(!body) throw 'body is undefined';          
      let accessToken = body.access_token;
      if(!accessToken) throw 'no access token';
      let refreshToken = body.refresh_token;
      if(!refreshToken) throw 'no refresh token';
      let expiryIn = body.expires_in         
      if(!expiryIn) throw 'no expires in time';
      callback({
        accessToken : accessToken, 
        refreshToken : refreshToken, 
        expiryIn : expiryIn
      });
    });
  },
  refreshAccessToken : function(authOptions, callback){
    request.post(authOptions, (error, response, body) => {
      if(error) throw error;
      if(response.statusCode === 200 && body) {      
        var accessToken = body.access_token;
        if(!accessToken) throw 'no access token';      
        var expiryIn = body.expires_in;   
        if(!expiryIn) throw 'no expires in time';  
        callback(accessToken, expiryIn);         
      }
      else{
        debug("cannot get refresh token: " + response.statusCode);
      }
    });
  },
  generateAuthHeader: function(headerType, authCode, url, token) {    
    if(typeof headerType !== "string") throw 'header type is wrong; did you pass the object by mistake?'
    switch(headerType){
      case(this.headerType.DATAREQ) :
        return {
          url: url,
          headers: { Authorization: "Bearer " + token },
          json: true
        };
      case(this.headerType.REFRESH) :
        return {
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            Authorization:
              "Basic " +
              new Buffer(clientID + ":" + clientSecret).toString("base64")
          },
          form: {
            grant_type: 'refresh_token',
            refresh_token: token
          },
          json: true
        };
      case(this.headerType.LOGIN) : 
        return {
          url: 'https://accounts.spotify.com/api/token',
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
        }
    }
  },
  generateQueryString: function(time, limit, offset) {
    if (!time) time = timeRange.SHORT;
    if (!limit) limit = 20;
    if (!offset) offset = 0;
    return queryString.stringify({
      time_range: time,
      limit: limit,
      offset: offset
    });
  },
  getTopArtists: function(accessToken, limit, offset, onRequestCompleted) {
    var storedResultsObj = {
      fourWeeks: null,
      sixMonths: null,
      allTime: null
    };  
    var callback = function(timeRange, result) {    
      this._storeResults(result, storedResultsObj, timeRange)
      if (storedResultsObj.allTime && storedResultsObj.sixMonths && storedResultsObj.fourWeeks) {
        onRequestCompleted(storedResultsObj);
      }
    }.bind(this);
    this._getRequest(accessToken, limit, offset, callback, this._requestType.ARTISTS);
  },
  getTopTracks: function(accessToken, limit, offset, onTracksRequestCompleted) {
    var storedResultsObj = {
      fourWeeks: null,
      sixMonths: null,
      allTime: null
    };  
    var callback = function(timeRange, result) {    
      this._storeResults(result, storedResultsObj, timeRange)
      if (storedResultsObj.allTime && storedResultsObj.sixMonths && storedResultsObj.fourWeeks) {
        onTracksRequestCompleted(storedResultsObj);
      }
    }.bind(this);
    this._getRequest(accessToken, limit, offset, callback, this._requestType.TRACKS);
  },
  _storeResults : function(currentResult, resultsObj, timeRange){
    switch (timeRange) {
      case this._timeRange.SHORT:
        resultsObj.fourWeeks = currentResult;
        break;
      case this._timeRange.MEDIUM:
        resultsObj.sixMonths = currentResult;
        break;
      case this._timeRange.LONG:
        resultsObj.allTime = currentResult;
        break;
    }
  },
  _getRequest(accessToken, limit, offset, callback, requestedDataType) {   
    if(requestedDataType){
      var createRequest = function(i){
        var currentTimeRange = Object.values(this._timeRange)[i]; 
        var queryString = "?" + this.generateQueryString(currentTimeRange, limit, offset);
        var header = this.generateAuthHeader(this.headerType.DATAREQ, null,  
          "https://api.spotify.com/v1/me/top/" + requestedDataType + "" + queryString, accessToken);
        debug("finalised header: " + header.headers); 
        request.get(header, (err, res, body) => {
          if (err) throw err;
          if (res.statusCode === 200) {
            body ? callback(currentTimeRange, body.items) : console.error("songs are undefined");
          } else {
            throw "" + JSON.stringify(body);
          }
        });
      }.bind(this);
      for(let i = 0; i <= 2; i++){
        createRequest(i);
      }
    }
    else{
      throw 'get Request type is undefined';
    }
  },
};
