import React from 'react';
import App from 'common/react/index';
import ReactDOM from 'react-dom';

export default function renderApps() {
    const roots = {
        tracks: document.getElementById('tracks')
        // artists: document.getElementById('artists')
    };
    const props = getInitialState();
    renderApp(roots.tracks, props.tracks);
    // renderApp(roots.artists, data.artists, id.ARTISTS);
    // TO DO: ERASE THE DATA THAT IS BAKED RENDERED INTO THE HTML PAGE
    // clearInitialState();
}

function renderApp(root, props) {
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
