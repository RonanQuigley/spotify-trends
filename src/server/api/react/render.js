import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import Styles from './styles';
import Charts from 'charts';
import Pie from 'pie/';

function serverSideRender(app, registry) {
    return {
        html: renderToString(app),
        css: registry.toString()
    };
}

function setupApp(appProps, registry, appToRender) {
    return (
        <Styles registry={registry}>
            {appToRender === type.CHARTS ? (
                <Charts {...appProps} map={new Map()} />
            ) : (
                <Pie {...appProps} map={new Map()} />
            )}
        </Styles>
    );
}

export const type = {
    PIE: 'pie',
    CHARTS: 'charts'
};

export function renderApp(props, appToRender) {
    const registry = new SheetsRegistry();
    const app = setupApp(props, registry, appToRender);
    return serverSideRender(app, registry);
}
