import results from './results.hbs';

export function render(req, res, next) {
    res.send(results());
}
