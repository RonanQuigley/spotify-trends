import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
    router.get(
        '/results',
        middleware.renderReactAssets,
        middleware.renderResults,
        middleware.errorHandler
    );
} else {
    router.get(
        '/results',
        middleware.getAccessToken,
        middleware.getUserData,
        middleware.processUserData,
        middleware.getAudioStats,
        middleware.renderReactAssets,
        middleware.renderResults,
        middleware.errorHandler
    );
}

export default router;
