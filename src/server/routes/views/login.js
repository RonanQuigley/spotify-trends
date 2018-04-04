import express from 'express';
import index from './index.hbs';
import { stringify } from 'query-string';
const router = express.Router();

const urlString = stringify({
    response_type: 'code', // as in a authorization code
    client_id: process.env.CLIENT_ID, // application id
    scope: 'user-read-private user-read-email user-top-read', //permissions
    redirect_uri: 'http://localhost:' + process.env.PORT + '/callback'
});

router.get('/login', (req, res) => {
    // your application requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' + urlString);
});

router.get('/', (req, res, next) => {
    res.send(
        index({
            title: 'Home Page'
        })
    );
});

export default router;
