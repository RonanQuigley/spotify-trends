import { getQueryStringElement } from './uri';
import { fetchData, generateHeader } from './server-fetch';

import * as User from './user';

export const names = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryIn: 'expiryIn'
};

export function setToken(name, value) {
    localStorage.setItem(name, value);
}

export function getToken(name) {
    return localStorage.getItem(name);
}

export function updateAccessAndExpiryTokens(accessToken, expiryIn) {
    setToken(names.accessToken, accessToken);
    setToken(names.expiryIn, expiryIn);
}

export function getAccessAndRefreshTokens() {
    return {
        accessToken: localStorage.getItem(names.accessToken),
        refreshToken: localStorage.getItem(names.refreshToken)
    };
}

export function getAccessTokenExpiry() {
    const value = localStorage.getItem(names.expiryIn);
    /* local storage uses strings and undefined can show up 
    as a string. we need to check for this */
    return value !== 'undefined' ? value : null;
}

export function setAccessTokenExpiry(expiry) {
    const now = Date.now();
    // add the number of ms to seconds, then
    // x 1000 to create an hour from now.
    const value = now + parseInt(expiry, 10) * 1000;
    localStorage.setItem(names.expiryIn, value);
}

export function getValidAccessToken() {
    const value = parseInt(localStorage.getItem(names.expiryIn), 10);
    const token = localStorage.getItem(names.accessToken);
    const now = Date.now();
    return !!token && !!value && value > now ? token : null;
}

export function updateTokenFromUrl(tokenToUpdate) {
    const value = getQueryStringElement(tokenToUpdate);
    tokenToUpdate !== names.expiryIn
        ? setToken(tokenToUpdate, value)
        : setAccessTokenExpiry(value);
}

export function updateAllTokens() {
    if (!getValidAccessToken()) {
        /* access token is no longer valid
        update both the access token and expiry */
        updateTokenFromUrl(names.accessToken);
        updateTokenFromUrl(names.expiryIn);
    }
    if (!getToken(names.refreshToken)) {
        /* refresh tokens are indefinite; this means this 
        should only be called for a new user */
        updateTokenFromUrl(names.refreshToken);
    }
}

export async function refreshAccessToken(tokens) {
    if (tokens.accessToken && tokens.refreshToken) {
        const results = await getNewAccessToken(tokens.refreshToken);
        updateAccessAndExpiryTokens(results.accessToken, results.expiry);
    }
}

export async function getNewAccessToken(refreshToken, expiredToken) {
    const header = generateHeader(refreshToken, expiredToken);
    const tokens = await fetchData('/refresh', header);
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.expiryIn
    };
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
