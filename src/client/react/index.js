import React from 'react';
import ReactDOM from 'react-dom';
import { getApps, renderType } from 'common/utilities';
import SSRRemover from 'src/client/react/ssr-remover';
import Theme from 'common/react/common/theme';
import whyDidYouUpdate from 'why-did-you-update';
import Immutable from 'immutable';
import { createMuiTheme } from '@material-ui/core';
import App from 'common/react/app';

export default function renderApps() {
    const props = getInitProps();

    const theme = createMuiTheme(Theme);

    // const apps = getApps(theme, props, renderType.CLIENT);

    const app = <App theme={theme} childProps={props} />;

    ReactDOM.hydrate(
        <SSRRemover>{app}</SSRRemover>,
        document.querySelector('#root')
    );

    // whyDidYouUpdate(React);

    clearInitPropsFromDOM();
    clearInitPropsFromWindow();
}

function getInitProps() {
    return window.__initial__props__;
}

function clearInitPropsFromDOM() {
    document.getElementById('props').remove();
}

function clearInitPropsFromWindow() {
    delete window.__initial__props__;
}

if (module.hot) {
    module.hot.accept();
}
