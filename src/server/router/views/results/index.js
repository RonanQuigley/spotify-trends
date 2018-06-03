import express from 'express';
import * as middleware from './middleware';
const router = express.Router();
console.warn('need to change router middlewre for results page');
if (process.env.NODE_ENV === 'CHANGE ME BACK TO DEVELOPMENT') {
    router.get(
        '/results',
        middleware.setupDevelopmentAssets,
        middleware.setupReactProps,
        middleware.generateReactApps,
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
        middleware.setupReactProps,
        middleware.generateReactApps,
        middleware.renderResults,
        middleware.errorHandler
    );
}

export default router;
