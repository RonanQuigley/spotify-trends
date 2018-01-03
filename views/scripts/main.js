window.onload = function(){
    var accessToken = Token.getValidAccessToken();
    if(accessToken){        
        var queryString = '?access_token=' + accessToken;
        window.location.assign('results' + queryString); 
        // // window.location.href = '/results?';
        // (function redirect(accessToken){            
        //     var xhr = new XMLHttpRequest();
        //     var query = 'access_token=' + accessToken;
        //     xhr.open('GET', 'validation?' + query);
        //     xhr.onload = function() {
        //         if(this.status === 200){
        //             console.log(this.response);                                                                          
        //         }
        //         else{
        //             console.error(this.status);
        //         }
        //     }
        //     xhr.send();
        // }(accessToken));
    }
    else{
        var expiredToken = Token.getAccessToken();
        var refreshToken = Token.getRefreshToken();
        if(expiredToken && refreshToken){            
            var queryString = '?access_token=' + expiredToken
                                + '&refresh_token=' + refreshToken;
            window.location.assign('/refresh' + queryString);
        }
        else if(window.location.hash){
            var hashString = window.location.hash.substr(window.location.hash.indexOf('#')+1);
            if(hashString === 'error=invalid_token'){
                (function refreshToken(){
                    var refreshToken = Token.getRefreshToken();
                    if(refreshToken){
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', 'refresh');
                        xhr.setRequestHeader('refresh_token', refreshToken);
                        xhr.onload = function() {
                            if(this.status === 200){
                                var obj = JSON.parse(this.response);
                                Token.setAccessToken(obj.access_token);
                                Token.setAccessTokenExpiry(obj.expiry_in);                                
                            }
                            else{
                                console.error(this.status);
                            }
                        }
                        xhr.send();
                    }
                }());
            } 
        }
    }
}   