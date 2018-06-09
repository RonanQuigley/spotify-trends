import React from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'victory';

export default class App extends PureComponent {
    static propTypes = {
        props: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        sheetsManager: PropTypes.object
    };

    render() {
        const { theme, sheetsManager, ...props } = this.props;

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
}
