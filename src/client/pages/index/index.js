import { isExistingUser, processUser } from '../../utilities/user';
import React from 'react';
import App from 'common/react/apps/index';
import { hydrateApp } from 'src/client/react';

window.onload = () => {
    (async () => {
        if (isExistingUser()) {
            await processUser();
        }
    })();

    const app = <App />;
    hydrateApp(app);
};
