import React from 'react';
import App from 'common/react/apps/index';
import serverSideRender from 'src/server/api/react/render';
import Theme from 'common/react/common/theme/index';
import { SheetsRegistry } from 'react-jss/lib/jss';

export function setupReactApp(req, res, next) {
    const app = <App />;

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    const html = serverSideRender(app, sheetsRegistry, Theme);

    const css = sheetsRegistry.toString();

    res.locals.react = {
        apps: {
            html: html,
            css: css
        }
    };

    return next();
}

export function renderPage(req, res, next) {
    const pageTitle = `Statisfy`;

    const html = res.locals.react.apps.html;
    const css = res.locals.react.apps.css;
    const env = process.env.NODE_ENV;
    const dev = env === 'development' ? `<script src="/dev.js"></script>` : ``;
    // get rid of unused font weights once done.
    const font =
        'https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500|Roboto+Mono:100,200,300';
    const payload = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href=${font}>
            <title>${pageTitle}</title>
            <style id="jss-server-side">${css}</style>
            <script src="/index.js"></script>
        </head>
        <body>
            <div id="root">${html}</div>                      
            ${dev}
        </body>
    </html>`;

    res.send(payload);
}
