import express from 'express';
import index from './views/index';
import login from './views/login';
import callback from './views/callback';
import results from './views/results';
const router = express.Router();

router.use(
    index,
    login,
    callback,
    results
    // and any other pages you need
);

// export a function for hot server middleware purposes
export default () => router;
