var queryString = require('querystring');
var debug = require("debug")("spotifydebug:");
var request = require('request');
var util = require('util');
module.exports = {
  timeRange: {
    SHORT: "short_term", // last 4 weeks
    MEDIUM: "medium_term", // approx last 6 months
    LONG: "long_term" // several years of data
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
  getTopArtists: function(accessToken, timeRange, limit, offset, callback) {
    var queryString = this.generateQueryString(timeRange, limit, offset);
    var header = this.generateAuthHeader(
      "https://api.spotify.com/v1/me/top/artists?" + queryString,
      accessToken
    );
    debug("finalised header: " + header.headers);
    request.get(header, (err, res, body) => {
      if (err) throw err;
      if (res.statusCode === 200) {
        debug("top Artists : " + util.inspect(body.items, false, null));
        body ? callback(body.items) : console.error("artists are undefined");
      } else {
        throw "" + res.statusCode + ": " + res.statusMessage;
      }
    });
  },
  getTopSongs: function(accessToken, timeRange, limit, offset, callback) {
    var queryString = this.generateQueryString(timeRange, limit, offset);
    var header = this.generateAuthHeader(
      "https://api.spotify.com/v1/me/top/tracks?" + queryString,
      accessToken
    );
    debug("finalised header: " + header.headers);
    request.get(header, (err, res, body) => {
      if (err) throw err;
      if (res.statusCode === 200) {
        debug("top songs : " + util.inspect(body.items, false, null));
        body ? callback(body.items) : console.error("songs are undefined");
      } else {
        throw "" + res.statusCode + ": " + res.statusMessage;
      }
    });
  }  
};
