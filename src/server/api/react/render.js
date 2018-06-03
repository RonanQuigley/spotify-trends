import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import Styles from './styles';
import App from 'charts/index';

function serverSideRender(app, registry) {
    return {
        html: renderToString(app),
        css: registry.toString()
    };
}

function setupApp(appProps, registry) {
    return (
        <Styles registry={registry}>
            <App {...appProps} map={new Map()} />
        </Styles>
    );
}

export function renderApp(props) {
    const registry = new SheetsRegistry();
    const app = setupApp(props, registry);
    return serverSideRender(app, registry);
}
