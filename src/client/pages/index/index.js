import { isExistingUser, processUser } from '../../utilities/user';
import React from 'react';
import App from 'common/react/apps/index';
import { hydrateApp } from 'src/client/react';
import Theme from 'common/react/common/theme';

window.onload = () => {
    (async () => {
        if (isExistingUser()) {
            await processUser();
        }
    })();

    const app = <App />;
    hydrateApp(app, Theme);
};

if (module.hot) {
    /* 
        When using CommonJS, you MUST update dependencies 
        manually by using re-requiring the modules in the callback. 
        https://webpack.js.org/api/hot-module-replacement/ 
    */
    // accept changes from the theme
    module.hot.accept('common/react/common/theme/index', () => {
        const { hydrateApp } = require('src/client/react');
        // this is a export default, so use .default
        const theme = require('common/react/common/theme/index').default;
        const app = <App />;
        hydrateApp(app, theme);
    });
    // accept changes to self
    module.hot.accept();
}
