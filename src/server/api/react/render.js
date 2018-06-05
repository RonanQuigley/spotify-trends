import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import Styles from './styles';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';

function serverSideRender(app, registry) {
    return {
        html: renderToString(app),
        css: registry.toString()
    };
}

export const type = {
    PIE: 'pie',
    CHARTS: 'charts',
    POLAR: 'polar'
};

function getApp(props, appToRender) {
    const map = new Map();
    switch (appToRender) {
        case type.CHARTS:
            return <Charts {...props} map={map} />;
        case type.PIE:
            return <Pie {...props} map={map} />;
        case type.POLAR:
            return <Polar {...props} map={map} />;
    }
}

function setupApp(appProps, registry, appToRender) {
    return <Styles registry={registry}>{getApp(appProps, appToRender)}</Styles>;
}

export function renderApp(props, appToRender) {
    const registry = new SheetsRegistry();
    const app = setupApp(props, registry, appToRender);
    return serverSideRender(app, registry);
}
