import React from 'react';
import ReactDOM from 'react-dom';
import SSRRemover from 'src/client/react/ssr-remover';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles';

export function hydrateApp(app, theme) {
    // pass the theme in so that it is
    // changeable and can be hot reloaded
    const muiTheme = createMuiTheme(theme);
    if (process.env.NODE_ENV === 'development') {
        window.theme = muiTheme;
    }

    ReactDOM.hydrate(
        <SSRRemover>
            <JssProvider
                jss={create(jssPreset())}
                generateClassName={createGenerateClassName()}
            >
                <MuiThemeProvider theme={muiTheme}>{app}</MuiThemeProvider>
            </JssProvider>
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

if (module.hot) {
    module.hot.accept();
}
