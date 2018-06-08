import React from 'react';
import Chart from 'charts';
import Pie from 'pie';
import ReactDOM from 'react-dom';
import { appID, getApp, appType, getApps, renderType } from 'common/utilities';
import { renderApp } from 'src/server/api/react/render';
import Polar from 'common/react/polar';
import {
    createMuiTheme,
    MuiThemeProvider,
    createGenerateClassName
} from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';
import SSRRemover from 'src/client/react/ssr-remover';
import { SheetsRegistry } from 'jss';
import Theme from 'common/react/common/theme';

export default function renderApps() {
    const props = getInitProps();

    const theme = createMuiTheme(Theme);

    const apps = getApps(theme, props, renderType.CLIENT);

    ReactDOM.hydrate(
        <SSRRemover>{apps}</SSRRemover>,
        document.querySelector('#root')
    );

    clearInitProps();
}

function getInitProps() {
    return window.__initial_state__;
}

function clearInitProps() {
    delete window.__initial_state__;
}
