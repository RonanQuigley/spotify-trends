import { isExistingUser, processUser } from '../../utilities/user';

(async () => {
    if (isExistingUser()) {
        await processUser();
    }
})();
