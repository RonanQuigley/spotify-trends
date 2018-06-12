import React from 'react';
import App from 'common/react/apps/index';
import serverSideRender from 'src/server/api/react/render';
import { SheetsRegistry } from 'react-jss/lib/jss';

export function setupReactApp(req, res, next) {
    const app = <App />;

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    const html = serverSideRender(app, sheetsRegistry);

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
    const font = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
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
            <div id="login-wrapper">
                <a href="/login">Login</a>
            </div>
            ${dev}
        </body>
    </html>`;

    res.send(payload);
}
