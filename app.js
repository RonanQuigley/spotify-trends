// third-party modules
const dotenv = require('dotenv').config();
const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const morgan = require("morgan");
const reload = require("reload");
const debug = require("debug")("app:server");

// program modules
const utilities = require('./lib/utilities');
const spotifyApi = require('./lib/spotify-api');
const hbs = require('./lib/handlebars');
const resultsRouting = require('./lib/routing/results');

// globals
const publicDir = __dirname + "/public";
const port = 9999;
const clientID = process.env.CLIENT_ID; // Your client id
const clientSecret = process.env.CLIENT_SECRET ; // Your secret
const headerType = spotifyApi.headerType;
const appTitle = 'Spotify Trends';

var app = (function initExpressApp(){
  let app = express();
  app.engine("hbs", hbs.getEngine());
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");
  app.use(express.static(__dirname + "/views"));
  return app; 
})();

app.get("/login", function(req, res) {
  // defines the kinds of spotify data that we're looking to access
  let scope = "user-read-private user-read-email user-top-read";
  let urlString = utilities.generateQueryString({
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
app.get("/callback", (req, res) => {
  let authCode = req.query.code; // the authorization code
  if (!authCode) throw 'authCode is undefined';
  // make a request for tokens
  let authOptions = spotifyApi.generateAuthHeader(headerType.LOGIN, authCode, null, null);  
  spotifyApi.requestTokens(authOptions, (obj) => {
    res.redirect('results?' + utilities.generateQueryString({
      access_token : obj.accessToken,
      refresh_token : obj.refreshToken,
      expiry_in : obj.expiryIn
    }));
  });
});

app.use('/results', [
  resultsRouting.getTokensFromClient, 
  resultsRouting.requestSpotifyData,
  resultsRouting.processSpotifyData,
  resultsRouting.renderResultsPage
]);

app.get("/refresh", (req, res) => {
  // requesting access token from refresh token
  let refresh_token = req.headers.refresh_token ? req.headers.refresh_token : req.query.refresh_token;
  if(!refresh_token) throw 'missing refresh token - check client side naming';
  let authOptions = spotifyApi.generateAuthHeader(headerType.REFRESH, null, null, refresh_token);
  spotifyApi.refreshAccessToken(authOptions, (accessToken, expiryIn) => {
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
