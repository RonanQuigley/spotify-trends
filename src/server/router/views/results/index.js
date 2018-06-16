import express from 'express';
import * as middleware from './middleware';
import * as devMiddleware from './dev-middleware';
const router = express.Router();

// rather than put this in an env file
// this allows for hot reloading
const skipData = true;

// DO NOT ASSIGN PROCESS.ENV.NODE_ENV TO A VARIABLE
// OR TREE SHAKING FOR THIS SECTION WILL FAIL - WHY I HAVE NO IDEA
if (process.env.NODE_ENV === 'development' && skipData === true) {
    // for faster login where we use our dev assets
    console.warn(
        'Using development mode: skipping spotify server requests'.green
    );
    router.get(
        '/results',
        devMiddleware.setupDevelopmentAssets,
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
