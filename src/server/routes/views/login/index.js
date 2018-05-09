import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

// console.log(...Object.values(middleware));

router.get('/login', ...Object.values(middleware));

export default router;
