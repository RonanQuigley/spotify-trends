import React, { PureComponent } from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import {
    MuiThemeProvider,
    CssBaseline,
    createMuiTheme,
    withStyles
} from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';
import Theme from 'common/react/common/theme';
import styles from './styles';
@hot(module)
@withStyles(styles)
export default class App extends PureComponent {
    static propTypes = {
        childProps: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        sheetsManager: PropTypes.object,
        classes: PropTypes.object
    };

    render() {
        const { sheetsManager, childProps, classes, theme } = this.props;
        const { artists, tracks } = classes;
        console.log(classes);
        return (
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <CssBaseline />
                <div className={classes.topChartsContainer}>
                    <div id="artists" className={artists}>
                        <Charts {...childProps.artists} />
                    </div>
                    <div id="tracks" className={tracks}>
                        <Charts {...childProps.tracks} />
                    </div>
                </div>
                <div id="audio-features-container">
                    <Pie {...childProps.key} />
                    <Pie {...childProps.mode} />
                    <Polar {...childProps.average} />
                </div>
            </MuiThemeProvider>
        );
    }
}
