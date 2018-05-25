import React from 'react';
import ReactDOM from 'react-dom';
import App from 'common/react';

export function renderApp(root) {
    const renderMethod = getRenderMethod();
    renderMethod(<App data={window.__initial_state__} />, root);
}

function getRenderMethod() {
    // if module.hot exists, use render in dev hydrate in prod
    return !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
}
