import { renderApp } from '../../react';
import { updateAllTokens } from '../../utilities/tokens';

// when working with react & data fixtures, we don't need to update tokens
if (process.env.NODE_ENV !== 'development') {
    updateAllTokens();
} else {
    console.warn(`In dev mode for react; tokens won't be updated`);
}

const root = document.getElementById('root');

renderApp(root);

if (module.hot) {
    module.hot.accept();
}
