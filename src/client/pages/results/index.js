import '../../react';
import { updateAllTokens } from '../../utilities/tokens';

// when working with react & data fixtures, we don't need to update tokens
if (process.env.NODE_ENV !== 'development') {
    updateAllTokens();
} else {
    console.warn(`In react dev mode; tokens won't be updated`);
}

if (module.hot) {
    module.hot.accept();
}
