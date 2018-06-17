import App from 'common/react/apps/invalid';
import Theme from 'common/react/common/theme/invalid';
import React from 'react';
import { SheetsRegistry } from 'react-jss/lib/jss';
import serverSideRender from 'src/server/api/react/render';

export function renderInvalidUserDataPage(req, res, next) {
    /* TO DO: - REFACTOR -THIS CODE IS SIMILIAR TO GENERATE REACT APPS IN MIDDLEWARE */
    const app = <App />;

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Render the apps to a string.
    const html = serverSideRender(app, sheetsRegistry, Theme);

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();
    const env = process.env.NODE_ENV;
    const dev =
        env === 'development'
            ? `<script src="/dev.js"></script>
               <script src="/invalid.js"></script>`
            : ``;
    // remember to remove unused font sizes
    const font =
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Roboto+Mono:300';
    const pageTitle = 'Results';

    const payload = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${pageTitle}</title>
            <link rel="stylesheet" href=${font}>
            <style id="jss-server-side">${css}</style>    
            
        </head>
        <body>
            <div id="root">${html}</div>
            ${dev}
        </body>
    </html>`;

    res.send(payload);
}
