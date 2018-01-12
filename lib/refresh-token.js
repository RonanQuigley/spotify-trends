function hasTokenExpired(startTime, timeToExpire){   
    var elapsedSeconds = (new Date().getTime() - startTime.getTime()) * 0.001;   
    var elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if(elapsedSeconds >= 5){  
      return true;
    }
    return false;
  }
  
  function refreshAccessToken(refreshToken){
    // requesting new token from refresh token  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if(error) throw error;
      if(!body) throw 'body is undefined';
      if(response.statusCode !== 200) throw '' + response;                 
        accessToken = body.access_token;
        debug("new access token generated with refresh token: " + accessToken);      
    }); 
  }

  