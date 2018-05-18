import {
    isExistingUser,
    redirectUser,
    processUser
} from '../../utilities/user';
import { getToken, names } from '../../utilities/tokens';
import { debug } from 'util';

(async () => {
    if (isExistingUser()) {
        await processUser();
    }
})();
