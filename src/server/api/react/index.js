import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import Build from './build';

export function renderApp(build) {
    return {
        html: renderToString(build.app),
        css: build.registry
    };
}

export function buildApp(data, id) {
    const registry = new SheetsRegistry();
    return {
        app: <Build data={data} id={id} registry={registry} />,
        registry: registry
    };
}
