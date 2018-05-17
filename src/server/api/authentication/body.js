import { grantType } from './header';

export function generateAccessBody(token) {
    return {
        form: {
            /* the auth code string the user first recieves 
            from an initial auth login to spotify  
            */
            code: token,
            redirect_uri: process.env.REDIRECT_URI, // the callback uri
            grant_type: grantType.AUTH
        }
    };
}

export function generateRefreshBody(token) {
    return {
        form: {
            refresh_token: token,
            grant_type: grantType.REFRESH
        }
    };
}
