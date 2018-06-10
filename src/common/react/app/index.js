import React, { PureComponent } from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';

@hot(module)
export default class App extends PureComponent {
    static propTypes = {
        childProps: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        sheetsManager: PropTypes.object
    };

    render() {
        const { theme, sheetsManager, childProps } = this.props;
        return (
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <CssBaseline />
                <Charts {...childProps.artists} />
                <Charts {...childProps.tracks} />;
                <Pie {...childProps.key} />;
                <Pie {...childProps.mode} />;
                <Polar {...childProps.average} />;
            </MuiThemeProvider>
        );
    }
}
