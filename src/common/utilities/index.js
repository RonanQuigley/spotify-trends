import React from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import {
    MuiThemeProvider,
    CssBaseline,
    createMuiTheme
} from '@material-ui/core';

import PropTypes from 'prop-types';

export const renderType = {
    SERVER: 'server',
    CLIENT: 'client'
};

export function getApps(theme, props, type) {
    const sheetsManager = type === renderType.SERVER ? new Map() : null;
    return (
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <CssBaseline />
            <Charts {...props.artists} />
            <Charts {...props.tracks} />;
            <Pie {...props.key} />;
            <Pie {...props.mode} />;
            <Polar {...props.average} />;
        </MuiThemeProvider>
    );
}

getApps.propTypes = {
    artists: PropTypes.object,
    tracks: PropTypes.object,
    key: PropTypes.object,
    mode: PropTypes.object,
    average: PropTypes.object
};
