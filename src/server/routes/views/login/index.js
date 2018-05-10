import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.get('/login', middleware.redirectUser);

export default router;
