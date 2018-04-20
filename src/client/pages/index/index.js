import { isExistingUser, processUser } from '../../utilities/user';

if (isExistingUser()) {
    processUser();
}
