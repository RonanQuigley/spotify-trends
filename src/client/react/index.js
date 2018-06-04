import React from 'react';
import Chart from 'charts';
import Pie from 'pie';
import ReactDOM from 'react-dom';
import { appID } from 'common/utilities';
import { renderApp } from 'src/server/api/react/render';

export default function renderApps() {
    const roots = {
        tracks: document.getElementById(appID.TRACKS),
        artists: document.getElementById(appID.ARTISTS),
        mode: document.getElementById(appID.MODE),
        key: document.getElementById(appID.KEY),
        average: document.getElementById(appID.AVERAGE)
    };
    const props = getInitialState();
    console.warn(
        `You've disabled hydration for chart and some pie apps to ` +
            `improve hot reloading speed - remember to turn ` +
            `it back on once done`
    );
    // renderChartApp(roots.tracks, props.tracks);
    // renderChartApp(roots.artists, props.artists);
    renderPieApp(roots.mode, props.mode);
    // renderPieApp(roots.key, props.key);
    // renderPieApp(roots.average, props.average);

    // TO DO : ERASE THE DATA THAT IS BAKED RENDERED INTO THE HTML PAGE
    // TO DO : ERASE THE HTML INJECTED SERVER DATA
    // clearInitialState();
}

function renderPieApp(root, props) {
    const app = <Pie {...props} />;
    ReactDOM.hydrate(app, root);
}

function renderChartApp(root, props) {
    // const render = getRenderMethod();
    const app = <Chart {...props} />;
    ReactDOM.hydrate(app, root);
}

function getInitialState() {
    return window.__initial_state__;
}

function clearInitialState() {
    delete window.__initial_state__;
}
