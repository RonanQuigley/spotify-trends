import renderApps from 'src/client/react';
import { updateAllTokens } from 'src/client/utilities/tokens';

// when working with react & data fixtures, we don't need to update tokens
if (process.env.NODE_ENV !== 'development') {
    updateAllTokens();
} else {
    console.warn(`In dev mode for react; tokens won't be updated`);
    console.warn(`In dev mode for react; window __initial_state__ not cleared`);
}

window.onload = () => {
    renderApps();
};

if (module.hot) {
    module.hot.accept('src/client/react', () => {
        // we need to re-require the module for changes to take effect
        require('src/client/react').default();
    });
}
