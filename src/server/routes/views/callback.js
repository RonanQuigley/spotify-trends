import express from 'express';
import * as middleware from './callback-middleware';
const router = express.Router();

router.get('/callback', ...Object.values(middleware));

export default router;
