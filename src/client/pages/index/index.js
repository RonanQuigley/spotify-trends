import * as Token from '../../utilities/tokens';

const names = Token.names;

export function refreshAccessToken() {
    let expiredAccessToken = Token.getToken(names.accessToken);
    let refreshToken = Token.getToken(names.refreshToken);
    if (expiredAccessToken && refreshToken) {
        fetch('refresh');
    }
}

export function redirect(page, accessToken) {
    let queryString = '?accessToken' + accessToken;
    window.location.assign(page + queryString);
}

export function isExistingUser() {
    const accessToken = Token.getValidAccessToken();
    if (accessToken) {
        this.redirect('results', accessToken);
    } else {
        this.refreshAccessToken();
    }
}

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
