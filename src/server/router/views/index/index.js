import express from 'express';
import index from './index.hbs';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(
        index({
            dev: process.env.NODE_ENV === 'development' ? true : false,
            title: 'Home Page'
        })
    );
});

export default router;
