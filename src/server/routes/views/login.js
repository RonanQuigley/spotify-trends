import express from 'express';
import index from './index.hbs';

import { getHostName } from '../../utilities';
import * as middleware from './login-middleware';
const router = express.Router();

router.get('/login', ...Object.values(middleware));

export default router;
