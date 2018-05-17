import {
    isExistingUser,
    redirectUser,
    processUser
} from '../../utilities/user';
import { getToken, names } from '../../utilities/tokens';

(async () => {
    if (isExistingUser()) {
        await processUser();
        redirectUser('results', getToken(names.accessToken));
    }
})();
