import { refreshAccessToken } from '../../../api/authentication/tokens';

export async function processRequest(req, res, next) {
    try {
        const result = await refreshAccessToken(req);
        res.send(result);
    } catch (error) {
        return next(error);
    }
}
