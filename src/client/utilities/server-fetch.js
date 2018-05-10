import 'whatwg-fetch';

export function fetchData(endpoint, body) {
    // we wrap window.fetch in a function for unit testing purposes
    return window.fetch(endpoint, body);
}

export function generateHeader(refreshToken, expiredToken) {
    return {
        headers: {
            refreshToken: refreshToken,
            accessToken: expiredToken
        },
        json: true
    };
}

export function foo() {
    return 'foo';
}

export async function getNewAccessToken(refreshToken, expiredToken) {
    const header = generateHeader(refreshToken, expiredToken);
    const tokens = await fetchData('/refresh', header);
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.expiryIn
    };
}

// app.get("/refresh", (req, res) => {
//     // requesting access token from refresh token
//     let refresh_token = req.headers.refresh_token ? req.headers.refresh_token : req.query.refresh_token;
//     if(!refresh_token) throw 'missing refresh token - check client side naming';
//     let authOptions = spotifyApi.generateAuthHeader(headerType.REFRESH, null, null, refresh_token);
//     spotifyApi.refreshAccessToken(authOptions, (accessToken, expiryIn) => {
//       res.zsend({
//         'access_token': accessToken,
//         'expiry_in' : expiryIn
//       });
//     });
//   });

// window.onload = function(){
//     // remove the timeout once finished
//     window.setTimeout(function(){
//         var accessToken = Token.getValidAccessToken();
//         if(accessToken){
//             var queryString = '?access_token=' + accessToken;
//             window.location.assign('results' + queryString);
//         }
//         else{
//             var expiredToken = Token.getAccessToken();
//             var refreshToken = Token.getRefreshToken();
//             if(expiredToken && refreshToken){
//                 (function refreshAccessToken(refreshToken){
//                     var xhr = new XMLHttpRequest();
//                     xhr.open('GET', 'refresh');
//                     xhr.setRequestHeader('refresh_token', refreshToken);
//                     xhr.onload = function() {
//                         if(this.status === 200){
//                             var obj = JSON.parse(this.response);
//                             Token.setAccessToken(obj.access_token);
//                             Token.setAccessTokenExpiry(obj.expiry_in);
//                             var queryString = '?access_token=' + Token.getValidAccessToken();
//                             window.location.assign('results' + queryString);
//                         }
//                         else{
//                             console.error(this.status);
//                         }
//                     }
//                     xhr.send();
//                 }(refreshToken));
//             }
//             else if(window.location.hash){
//                 var hashString = window.location.hash.substr(window.location.hash.indexOf('#')+1);
//                 if(hashString === 'error=invalid_token'){
//                     (function refreshToken(){
//                         var refreshToken = Token.getRefreshToken();
//                         if(refreshToken){
//                             var xhr = new XMLHttpRequest();
//                             xhr.open('GET', 'refresh');
//                             xhr.setRequestHeader('refresh_token', refreshToken);
//                             xhr.onload = function() {
//                                 if(this.status === 200){
//                                     var obj = JSON.parse(this.response);
//                                     Token.setAccessToken(obj.access_token);
//                                     Token.setAccessTokenExpiry(obj.expiry_in);
//                                 }
//                                 else{
//                                     console.error(this.status);
//                                 }
//                             }
//                             xhr.send();
//                         }
//                     }());
//                 }
//             }
//         }
//     }, 0)
// }
