import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import Build from './build';

export default function renderApp(data, id) {
    const registry = new SheetsRegistry();
    const app = <Build data={data} id={id} registry={registry} />;
    const html = renderToString(app);
    const css = registry.toString();
    return {
        html: html,
        css: css
    };
}
