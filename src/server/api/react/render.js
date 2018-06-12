import { renderToString } from 'react-dom/server';
import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName
} from '@material-ui/core';

export default function serverSideRender(apps, registry, theme) {
    const muiTheme = createMuiTheme(theme);
    /* IMPORTANT
    the MuiThemeProvider and JssProvider CANNOT be put inside the app.
    It would otherwise result in the css failing for successive server 
    requests/page refreshes. DO NOT MOVE IT!!!!!!!!
    */
    return renderToString(
        <JssProvider
            registry={registry}
            generateClassName={createGenerateClassName()}
        >
            <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
                {apps}
            </MuiThemeProvider>
        </JssProvider>
    );
}
