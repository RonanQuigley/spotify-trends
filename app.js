var dotenv = require('dotenv').config();
var util = require('util');
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var morgan = require("morgan");
var querystring = require("querystring"); // genereates strings to send with urls
var app = express();
var reload = require("reload");
var debug = require("debug")("expressdebug:server");
var path = require("path");
var publicDir = path.join(__dirname, "public");
var port = 9999;
var clientID = "e71c573718c74445a4c7790b229b9a94"; // Your client id
var clientSecret = process.env.CLIENT_SECRET; // Your secret
if(!clientSecret) throw 'client secret is ' + clientSecret;
var redirectURI = "http://localhost:" + port + "/callback"; // Your redirect uri
var mongodbmongodb = require("./mongodb");
var expressHandlebars = require("express-handlebars");
var hbs = expressHandlebars.create({
  helpers: {
    stringify: function (value) {
        return JSON.stringify(value);
    }
  },
  extname : 'hbs',
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts"
});
var utilities = require('./utilities');
var spotify = require('./spotify');
var timeRange = spotify.timeRange;
var results = require('./results');



var appTitle = 'Spotify Trends';

var numOfTopArtistsResults = 5; // max of 50
var numOfTopSongsResults = 5; // max of 50
var topSongsOffset = 0; // results offset
var topArtistsOffset = 0; // results offset

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
// app.use(express.static(__dirname + '/resources', {index:false,extensions:['html']}));
app.use(express.static(__dirname + "/views"));

app.get("/login", function(req, res) {
  // defines the kinds of spotify data that we're looking to access
  var scope = "user-read-private user-read-email user-top-read";
  var urlString = querystring.stringify({
    response_type: "code", // as in a authorization code, not source code....
    client_id: clientID, // application id
    scope: scope, //permissions
    redirect_uri: redirectURI
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
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: authCode, // the authorizaton code string
        redirect_uri: redirectURI, // the callback uri
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(clientID + ":" + clientSecret).toString("base64")
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if(error) throw error;
      if (!error && response.statusCode === 200) {      
        // var uri = 'access-token=' + body.access_token + 
        //           '&refresh-token=' + body.refresh_token + 
        //           '&expiry-in=' + body.expires_in;
        // res.redirect('/?' + uri);
        // var artists = spotify.getTopArtists('short_tern', spotifyLogin.accessToken);
        // var songs = getTopSongs('short_term', spotifyLogin.accessToken);
        // console.log(artists);
        // console.log(songs);
        var accessToken = body.access_token;
        var refreshToken = body.refresh_token;
        var expiryIn = body.expires_in         
        if(!accessToken) throw 'no access token';
        if(!refreshToken) throw 'no refresh token';
        if(!expiryIn) throw 'no expires in time';
        res.redirect('results?' + querystring.stringify({
          access_token : accessToken,
          refresh_token : refreshToken,
          expiry_in : expiryIn
        }));
      } else {        
        res.redirect(res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        ));         
      }
    });
  } else {
    console.error("No auth code received");
  }
});

app.get('/results', (req,response) => {  
  debug("querystring is: " + req.query);
  var accessToken = req.query ? 
  req.query.access_token : req.headers.access_token;
  if(accessToken){
    var storedResults = {}; 
    var resultsSize = 2;  
    var resultsCount = 0;
    // callbacks for requesting spotify api data 
    spotify.getTopSongs(accessToken, timeRange.SHORT, 
      numOfTopSongsResults, topSongsOffset, storeTopSongs);
    spotify.getTopArtists(accessToken, timeRange.SHORT, 
      numOfTopArtistsResults, topArtistsOffset, storeTopArtists);
    function storeTopSongs(topSongs){
      storedResults.topSongs = topSongs;            
      updateRenderPageStatus();
    }
    function storeTopArtists(topArtists){
      storedResults.topArtists = topArtists;
      updateRenderPageStatus();
    }    
    function updateRenderPageStatus(){
      if(resultsCount + 1 === resultsSize){
        if(!utilities.isObjectEmpty(storedResults)){
          debug('stored results is of type: ' + typeof storedResults);
          var topArtists = results.getAllArtists(storedResults.topArtists);
          var topSongs = results.getAllSongs(storedResults.topSongs);
          debug(topArtists);
          debug(topSongs);
          response.render('results', {
            Spotify : {
              topArtists : topArtists,
              topSongs : topSongs
            }
          });
        }
        else{
          console.error('stored results obj is empty');
        }
      } 
      else{
        resultsCount++;
      }
      // (resultsCount + 1) === resultsSize ? 
      // response.render('results', storedResults) : resultsCount++;
    }
  }
  else{
    throw 'no valid access token';
  }
})

app.get("/refresh", (req, res) => {

  // requesting access token from refresh token
  var refresh_token = req.headers.refresh_token ? req.headers.refresh_token : req.query.refresh_token;
  if(!refresh_token) throw 'missing refresh token - check client side naming';
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        "Basic " +
        new Buffer(clientID + ":" + clientSecret).toString("base64")
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if(error) throw error;
    if(response.statusCode === 200) {      
      var access_token = body.access_token;
      var expiry_in = body.expires_in;              
      res.send({
        'access_token': access_token,
        'expiry_in' : expiry_in
      });
    }
    else{
      debug("cannot get refresh token: " + response.statusCode);
      debug(body);
    }
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
