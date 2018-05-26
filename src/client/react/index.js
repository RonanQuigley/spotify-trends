import React from 'react';
import ReactDOM from 'react-dom';
import App from 'common/react';

export default function renderApps() {
    const tracksRoot = document.getElementById('tracks');
    const artistsRoot = document.getElementById('artists');
    const data = getInitialState();
    renderApp(tracksRoot, data.tracks);
    renderApp(artistsRoot, data.artists);
    clearInitialState();
}

function renderApp(root, data) {
    const renderMethod = getRenderMethod();
    renderMethod(<App data={data} />, root);
}

function getRenderMethod() {
    // if module.hot exists, use render in dev hydrate in prod
    return !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
}

function getInitialState() {
    return window.__initial_state__;
}

function clearInitialState() {
    delete window.__initial_state__;
}
