function redirect(req, res, next) {
    res.redirect(200, '/results');
}

export { redirect };

// // log in successful, spotify authorizes access
// app.get("/callback", (req, res) => {

//     if (!authCode) throw 'authCode is undefined';
//     // make a request for tokens
//     let authOptions = spotifyApi.generateAuthHeader(headerType.LOGIN, authCode, null, null);
//     spotifyApi.requestTokens(authOptions, (obj) => {
//       res.redirect('results?' + utilities.generateQueryString({
//         access_token : obj.accessToken,
//         refresh_token : obj.refreshToken,
//         expiry_in : obj.expiryIn
//       }));
//     });
//   });
