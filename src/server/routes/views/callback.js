import express from 'express';
import index from './index.hbs';
const router = express.Router();

router.get('/callback', (req, res, next) => {
    res.end();
});

export default router;

// // log in successful, spotify authorizes access
// app.get("/callback", (req, res) => {
//     let authCode = req.query.code; // the authorization code
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
