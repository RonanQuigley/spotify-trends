// third-party modules
var dotenv = require('dotenv').config();
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var morgan = require("morgan");
var reload = require("reload");
var debug = require("debug")("expressdebug:server");

// program modules
var utilities = require('./utilities');
var spotifyApi = require('./spotify-api');
var results = require('./results');
var hbs = require('./handlebars');

// globals
var publicDir = __dirname + "/public";
var port = 9999;
var clientID = process.env.CLIENT_ID; // Your client id
var clientSecret = process.env.CLIENT_SECRET ; // Your secret
var headerType = spotifyApi.headerType;
var appTitle = 'Spotify Trends';
var numOfTopArtistsResults = 50; // max of 50
var numOfTopSongsResults = 50; // max of 50
var topTracksOffset = 0; // results offset
var topArtistsOffset = 0; // results offset

var app = (function initExpressApp(){
  var app = express();
  app.engine("hbs", hbs.getEngine());
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");
  app.use(express.static(__dirname + "/views"));
  return app; 
})();

function getSpotifyTokens(req, res, next){
  debug("querystring is: " + req.query);
  var accessToken = req.query ? req.query.access_token : req.headers.access_token;
  if(!accessToken) throw 'no valid access token';
  res.locals.accessToken = accessToken
  next();
}

function requestSpotifyData(req, res, next){
  let spotifyResults = results.createResultsObject(); 
    // IF YOU CHANGE THE RESULTS SIZE WHEN TESTING YOU MAY GET 
  // A 'CAN'T SET HEADERS AFTER THEY ARE SENT TO THE CLIENT' ERROR 
  let resultsSize = 2; 
  let resultsCount = 0;
  let accessToken = res.locals.accessToken;  
  spotifyApi.getTopArtists(accessToken, numOfTopArtistsResults, topArtistsOffset, (topArtistsResults) => {
    spotifyResults.topArtists.fourWeeks = topArtistsResults.fourWeeks;
    spotifyResults.topArtists.sixMonths = topArtistsResults.sixMonths;
    spotifyResults.topArtists.allTime = topArtistsResults.allTime;
    if(updateRenderPageStatus(++resultsCount, resultsSize)){
      next()
    }    
  });
  spotifyApi.getTopTracks(accessToken, numOfTopSongsResults, topTracksOffset, (topTracksResults) => {
    spotifyResults.topTracks.fourWeeks = topTracksResults.fourWeeks;
    spotifyResults.topTracks.sixMonths = topTracksResults.sixMonths;
    spotifyResults.topTracks.allTime = topTracksResults.allTime;
    if(updateRenderPageStatus(++resultsCount, resultsSize)){
      res.locals.spotifyResults = spotifyResults;
      next();
    }
  });
}

function updateRenderPageStatus(resultsCount, resultsSize){
  // we can't evaluate the variable using the ! operator as it would return true for 0/1
  if(resultsCount === undefined) throw 'resultsCount is undefined';
  if(resultsSize === undefined) throw 'resultsSize is undefined';
  return resultsCount === resultsSize;
}

function setupResultsPage(req, res, next){ 
  let spotifyResults = res.locals.spotifyResults; 
  if(utilities.isObjectEmpty(spotifyResults)) throw 'spotifyResults object is undefined';
  debug('stored results is of type: ' + typeof spotifyResults);         
  res.locals.finalResults = {
    topArtistsFourWeeks : results.getRelevantArtistsData(spotifyResults.topArtists.fourWeeks),
    topArtistsSixMonths : results.getRelevantArtistsData(spotifyResults.topArtists.sixMonths),
    topArtistsAllTime : results.getRelevantArtistsData(spotifyResults.topArtists.allTime),
    topTracksFourWeeks : results.getRelevantTracksData(spotifyResults.topTracks.fourWeeks),
    topTracksSixMonths : results.getRelevantTracksData(spotifyResults.topTracks.sixMonths),
    topTracksAllTime : results.getRelevantTracksData(spotifyResults.topTracks.allTime)
  }
  next();
}

function redirectToErrorPage(){
  res.redirect(res.redirect(
    "/#" +
      utilities.generateQueryString({
        error: "invalid_token"
      })
  ));  
}

function redirectToResultsPage(accessToken, refreshToken, expiryIn){
  res.redirect('results?' + utilities.generateQueryString({
    access_token : accessToken,
    refresh_token : refreshToken,
    expiry_in : expiryIn
  }));
}

function requestSpotifyTokens(authOptions){
  request.post(authOptions, function(error, response, body) {
    if(error) throw error;
    if (response.statusCode === 200 && body) {      
      var accessToken = body.access_token;
      if(!accessToken) throw 'no access token';
      var refreshToken = body.refresh_token;
      if(!refreshToken) throw 'no refresh token';
      var expiryIn = body.expires_in         
      if(!expiryIn) throw 'no expires in time';
      redirectToResultsPage(accessToken, refreshToken, expiryIn);
    } else {        
      redirectToErrorPage();       
    }
  });
}

function refreshAccessToken(authOptions, callback){
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
}

app.get("/login", function(req, res) {
  // defines the kinds of spotify data that we're looking to access
  var scope = "user-read-private user-read-email user-top-read";
  var urlString = utilities.generateQueryString({
    response_type: "code", // as in a authorization code, not source code....
    client_id: clientID, // application id
    scope: scope, //permissions
    redirect_uri: spotifyApi.redirectURI
  });
  debug(req.url);
  // your application requests authorization
  res.redirect("https://accounts.spotify.com/authorize?" + urlString);
});

// log in successful, spotify authorizes access
app.get("/callback", function(req, res) {
  var authCode = req.query.code; // the authorization code
  if (authCode) {
    // make a request for tokens
    let authOptions = spotifyApi.generateAuthHeader(headerType.LOGIN, authCode, null, null);  
    requestSpotifyTokens(authOptions);
  } else {
    console.error("No auth code received");
  }
});


app.use('/results', [
  getSpotifyTokens, 
  requestSpotifyData,
  setupResultsPage
]);

app.get('/results', (req, res) => {  
  let finalResults = res.locals.finalResults;
  res.render('results', {
    Spotify : {
      topArtistsFourWeeks : finalResults.topArtistsFourWeeks,
      topArtistsSixMonths : finalResults.topArtistsSixMonths,
      topArtistsAllTime : finalResults.topArtistsAllTime,
      topTracksFourWeeks : finalResults.topTracksFourWeeks,
      topTracksSixMonths : finalResults.topTracksSixMonths,
      topTracksAllTime : finalResults.topTracksAllTime
    }
  });
})

app.get("/refresh", (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.headers.refresh_token ? req.headers.refresh_token : req.query.refresh_token;
  if(!refresh_token) throw 'missing refresh token - check client side naming';
  var authOptions = spotifyApi.generateAuthHeader(headerType.REFRESH, null, null, refresh_token);
  refreshAccessToken(authOptions, (accessToken, expiryIn) => {
    res.send({
      'access_token': accessToken,
      'expiry_in' : expiryIn
    });
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    title : appTitle
  });  
});

console.log("app now listening on port " + port);

app.listen(port);

reload(app);
