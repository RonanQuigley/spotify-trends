import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

const nodeEnv = process.env.NODE_ENV;
// rather than put this in an env file
// this allows for hot reloading
const skipData = true;

if (nodeEnv === 'development' && skipData === true) {
    // for faster login where we use our dev assets
    console.warn(
        'Using development mode: skipping spotify server requests'.green
    );
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
