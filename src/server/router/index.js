import express from 'express';
import index from './views/index';
import login from './endpoints/login';
import callback from './endpoints/callback';
import results from './views/results';
import refresh from './endpoints/refresh';
const router = express.Router();

router.use(
    index,
    login,
    callback,
    results,
    refresh
    // and any other pages you need
);

// export a function for hot server middleware purposes
export default () => router;
