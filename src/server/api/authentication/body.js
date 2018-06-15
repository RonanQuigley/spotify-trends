import { grantType } from './header';
import { getRedirectURI } from 'src/server/api/authentication/utilities';

export function generateAccessBody(token) {
    return {
        form: {
            /* the auth code string the user first recieves 
            from an initial auth login to spotify  
            */
            code: token,
            redirect_uri: getRedirectURI(), // the callback uri
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
