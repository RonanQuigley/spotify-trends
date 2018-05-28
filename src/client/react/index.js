import { id, buildApp } from 'common/react/api/index';
import ReactDOM from 'react-dom';
export default function renderApps() {
    const roots = {
        tracks: document.getElementById('tracks'),
        artists: document.getElementById('artists')
    };
    const data = getInitialState();
    renderApp(roots.tracks, data.tracks, id.TRACKS);
    renderApp(roots.artists, data.artists, id.ARTISTS);
    clearInitialState();
}

function renderApp(root, data, id) {
    const render = getRenderMethod();
    const app = buildApp(data, id);
    render(app, root);
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
