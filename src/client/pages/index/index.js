import { isExistingUser, processUser } from '../../utilities/user';

window.onload = () => {
    (async () => {
        if (isExistingUser()) {
            await processUser();
        }
    })();
};
