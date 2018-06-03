import React from 'react';
import App from 'charts/index';
import ReactDOM from 'react-dom';
import { appID } from 'common/utilities';

export default function renderApps() {
    const roots = {
        tracks: document.getElementById(appID.TRACKS),
        artists: document.getElementById(appID.ARTISTS),
        mode: document.getElementById(appID.MODE)
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
