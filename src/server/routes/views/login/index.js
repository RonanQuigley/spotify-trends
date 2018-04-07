import express from 'express';
import { getHostName } from '../../../utilities';
import * as middleware from './middleware';
const router = express.Router();

router.get('/login', ...Object.values(middleware));

export default router;
