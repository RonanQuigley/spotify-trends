import { hydrateApp, getInitProps } from 'src/client/react';
import App from 'common/react/apps/results';
import React from 'react';
import Theme from 'common/react/common/theme';
import { updateAllTokens } from 'src/client/utilities/tokens';

window.onload = () => {
    const props = getInitProps();
    const app = <App childProps={props} />;
    if (process.env.NODE_ENV !== 'development') {
        clearInitPropsFromDOM();
        clearInitPropsFromWindow();
    }
    hydrateApp(app, Theme);

    // when working with react & data fixtures, we don't need to update tokens
    if (process.env.NODE_ENV !== 'development') {
        // update the tokens after hydration has taken effect
        updateAllTokens();
    } else {
        console.warn(`In dev mode for react; tokens won't be updated`);
        console.warn(`In dev mode for react; window props not cleared`);
    }
};

if (module.hot) {
    /* 
        When using CommonJS, you MUST update dependencies 
        manually by using re-requiring the modules in the callback. 
        https://webpack.js.org/api/hot-module-replacement/ 
    */
    // accept changes from the theme
    module.hot.accept('common/react/common/theme', () => {
        const { hydrateApp } = require('src/client/react');
        // this is a export default, so use .default
        const theme = require('common/react/common/theme').default;
        const props = getInitProps();
        const app = <App childProps={props} />;
        hydrateApp(app, theme);
    });
    // accept changes to self
    module.hot.accept();
}
