var queryString = require("querystring");
var debug = require("debug")("spotifydebug:");
var request = require("request");
var util = require("util");
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
  generateAuthHeader: function(url, accessToken) {
    return {
      url: url,
      headers: { Authorization: "Bearer " + accessToken },
      json: true
    };
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
  _getRequest(accessToken, limit, offset, callback, type) {   
    if(type){
      var createRequest = function(i){
        var currentTimeRange = Object.values(this._timeRange)[i];
        var queryString = "?" + this.generateQueryString(currentTimeRange, limit, offset);
        var header = this.generateAuthHeader("https://api.spotify.com/v1/me/top/" + type + "" + queryString, accessToken);
        debug("finalised header: " + header.headers); 
        request.get(header, (err, res, body) => {
          if (err) throw err;
          if (res.statusCode === 200) {
            body ? callback(currentTimeRange, body.items) : console.error("songs are undefined");
          } else {
            throw "" + res.statusCode + ": " + res.statusMessage;
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
