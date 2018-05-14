import { refreshAccessToken } from '../../../api';

export async function processRequest(req, res, next) {
    try {
        const result = await refreshAccessToken(req);
        res.send(result);
    } catch (error) {
        next(error);
    }
}
