import express from 'express';
import index from './index.hbs';
const router = express.Router();

router.get('/results', (req, res, next) => {
    res.send(
        index({
            title: 'Results Page'
        })
    );
});

export default router;
