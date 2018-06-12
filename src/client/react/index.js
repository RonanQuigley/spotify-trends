import React from 'react';
import ReactDOM from 'react-dom';
import SSRRemover from 'src/client/react/ssr-remover';
import Theme from 'common/react/common/theme';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export function hydrateApp(app) {
    const theme = createMuiTheme(Theme);
    if (process.env.NODE_ENV === 'development') {
        window.theme = theme;
    }
    ReactDOM.hydrate(
        <SSRRemover>
            <MuiThemeProvider theme={theme}>{app}</MuiThemeProvider>
        </SSRRemover>,
        document.querySelector('#root')
    );
}

export function getInitProps() {
    return window.__initial__props__;
}

export function clearInitPropsFromDOM() {
    document.getElementById('props').remove();
}

export function clearInitPropsFromWindow() {
    delete window.__initial__props__;
}
