import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.get(
    '/results',
    middleware.getAccessToken,
    middleware.getrequestHandler,
    middleware.renderResults,
    middleware.handleExpiredRejection
);

export default router;
