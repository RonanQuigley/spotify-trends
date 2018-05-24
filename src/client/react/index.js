import React from 'react';
import ReactDOM from 'react-dom';
import App from 'common/react';

export function renderApp(root) {
    const renderMethod = getRenderMethod();
    renderMethod(<App data={window.__initial_state__} />, root);
}

function getRenderMethod() {
    // use render in development, hydrate in production
    return !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
}
