import { hydrateApp, getInitProps } from 'src/client/react';
import App from 'common/react/apps/results';
import React from 'react';
import { updateAllTokens } from 'src/client/utilities/tokens';

// when working with react & data fixtures, we don't need to update tokens
if (process.env.NODE_ENV !== 'development') {
    updateAllTokens();
} else {
    console.warn(`In dev mode for react; tokens won't be updated`);
    console.warn(`In dev mode for react; window __initial_state__ not cleared`);
}

window.onload = () => {
    const props = getInitProps();
    const app = <App childProps={props} />;
    if (process.env.NODE_ENV !== 'development') {
        clearInitPropsFromDOM();
        clearInitPropsFromWindow();
    }
    hydrateApp(app);
};

if (module.hot) {
    module.hot.accept('src/client/react', () => {
        // we need to re-require the module for changes to take effect
        const { hydrateApp } = require('src/client/react');
        const props = getInitProps();
        const app = <App childProps={props} />;
        hydrateApp(app);
    });
}
