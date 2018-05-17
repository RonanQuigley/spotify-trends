import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.get('/callback', middleware.authUser, middleware.redirect);

export default router;
