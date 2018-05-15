import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.post('/refresh', middleware.processRequest);

export default router;
