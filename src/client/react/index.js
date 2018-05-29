import React from 'react';
import App from 'common/react/index';
import { id, buildApp } from 'common/react/api/index';
import theme from 'common/react/theme';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core';

export default function renderApps() {
    const roots = {
        tracks: document.getElementById('tracks')
        // artists: document.getElementById('artists')
    };
    const data = getInitialState();
    renderApp(roots.tracks, data.tracks, id.TRACKS);
    // renderApp(roots.artists, data.artists, id.ARTISTS);
    clearInitialState();
}

function renderApp(root, data, id) {
    const render = getRenderMethod();

    const app = (
        <MuiThemeProvider theme={theme}>
            <App data={data} id={id} />{' '}
        </MuiThemeProvider>
    );
    render(app, root);
}

function getRenderMethod() {
    // if module.hot exists, use render in dev hydrate in prod

    return ReactDOM.hydrate;
}

function getInitialState() {
    return window.__initial_state__;
}

function clearInitialState() {
    delete window.__initial_state__;
}
