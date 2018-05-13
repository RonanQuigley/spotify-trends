import express from 'express';
const router = express.Router();

router.get('/refresh', (req, res, next) => {
    res.send('refresh');
});

export default router;
