import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.get('/login', middleware.authUser);

export default router;
