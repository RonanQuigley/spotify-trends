import express from 'express';
import index from './index.hbs';
const router = express.Router();

console.log(index);

index();

router.get('/', (req, res, next) => {
    res.send(
        index({
            title: 'Home Page'
        })
    );
});

export default router;
