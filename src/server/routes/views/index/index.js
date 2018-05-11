import express from 'express';
import index from './index.hbs';
const router = express.Router();

console.log('hello');

router.get('/', (req, res, next) => {
    res.send('hello');
});

export default router;
