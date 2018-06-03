import React from 'react';
import App from 'common/react/index';
import ReactDOM from 'react-dom';

export default function renderApps() {
    const roots = {
        tracks: document.getElementById('tracks'),
        artists: document.getElementById('artists'),
        mode: document.getElementById('mode')
    };
    const props = getInitialState();
    renderChartApp(roots.tracks, props.tracks);
    renderChartApp(roots.artists, props.artists);

    // TO DO: ERASE THE DATA THAT IS BAKED RENDERED INTO THE HTML PAGE
    // clearInitialState();
}

function renderPieApp(root, props) {}

function renderChartApp(root, props) {
    // const render = getRenderMethod();
    const app = <App {...props} />;
    ReactDOM.hydrate(app, root);
}

function getInitialState() {
    return window.__initial_state__;
}

function clearInitialState() {
    delete window.__initial_state__;
}
