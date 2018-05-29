import index from './index.hbs';

export function renderPage(req, res, next) {
    const obj = {
        dev: process.env.NODE_ENV === 'development' ? true : false,
        title: 'Home Page'
    };
    const payload = index(obj);
    res.send(payload);
}