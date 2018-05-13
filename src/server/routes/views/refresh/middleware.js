export function getHeaderData(obj) {
    return '';
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
