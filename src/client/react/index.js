import React from 'react';
import ReactDOM from 'react-dom';
import { getApps, renderType } from 'common/utilities';
import SSRRemover from 'src/client/react/ssr-remover';
import Theme from 'common/react/common/theme';
import whyDidYouUpdate from 'why-did-you-update';
import Immutable from 'immutable';
import { createMuiTheme } from '@material-ui/core';

export default function renderApps() {
    const props = getInitProps();

    const theme = createMuiTheme(Theme);

    const apps = getApps(theme, props, renderType.CLIENT);

    ReactDOM.hydrate(
        <SSRRemover>{apps}</SSRRemover>,
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
