var dotenv = require('dotenv').config();
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
var mongodb = require("./mongodb");
var hbs = require("express-handlebars");

var appTitle = 'Spotify Trends';

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts"
  })
);

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
        // var artists = getTopArtists('short_tern', spotifyLogin.accessToken);
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
          accessToken : accessToken,
          refreshToken : refreshToken,
          expiryIn : expiryIn
        }));
      } else {        
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );         
      }
    });
  } else {
    console.error("No auth code received");
  }
});

app.get('/results', (req,response) => {  
  debug("querystring is: " + req.query);
  var accessToken = (req.query.access_token) ? 
  req.query.access_token : req.headers.access_token;
  if(accessToken){
    var storedResults = {}; 
    var resultsSize = 2;  
    var resultsCount = 0;
    getTopSongs(accessToken, timeRange.SHORT, 1, 0, storeTopSongs);
    getTopArtists(accessToken, timeRange.SHORT, 1, 0, storeTopArtists);
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
        if(!isObjectEmpty(storedResults)){
          debug('stored results is of type: ' + typeof storedResults);
          response.render('results', {
            topArtists : JSON.stringify(storedResults.topArtists),
            topSongs : JSON.stringify(storedResults.topSongs)
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

/// Spotify File

var timeRange = {
  SHORT : 'short_term', // last 4 weeks
  MEDIUM : 'medium_term', // approx last 6 months
  LONG : 'long_term' // several years of data
}

function generateAuthHeader(url, accessToken){
  return {
    url: url,
    headers: { 'Authorization': 'Bearer ' + accessToken},
    json: true
  }
}
function generateQueryString(time, limit, offset){
  if(!time) time = timeRange.SHORT;
  if(!limit) limit = 20; 
  if(!offset) offset = 0;
  return querystring.stringify({
    time_range : time,
    limit : limit,
    offset : offset,
  });
}

function getTopArtists(accessToken, timeRange, limit, offset, callback){
  var queryString = generateQueryString(timeRange, limit, offset);
  var header = generateAuthHeader('https://api.spotify.com/v1/me/top/artists?' 
  + queryString, accessToken);
  debug("finalised header: " + header.headers);
  request.get(header, (err, res, body) => {
    if(err) throw err;
    if(res.statusCode === 200){
      body ? callback(body.items) : console.error('artists are undefined');
    }else{
      throw '' + res.statusCode + ': ' + res.statusMessage;
    }      
  })
}

function getTopSongs(accessToken, timeRange, limit, offset, callback){
  var queryString = generateQueryString(timeRange, limit, offset);  
  var header = generateAuthHeader('https://api.spotify.com/v1/me/top/tracks?' 
  + queryString, accessToken);
  debug("finalised header: " + header.headers);
  request.get(header, (err, res, body) => {
    if(err) throw err;
    if(res.statusCode === 200){
      body ? callback(body.items) : console.error('songs are undefined');
    }else{
      throw '' + res.statusCode + ': ' + res.statusMessage;
    }    
  })
}

function calculateTopGenres(){
  
}



// Utilities file

function isObjectEmpty(obj){
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}
