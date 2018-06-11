import React, { PureComponent } from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import {
    MuiThemeProvider,
    CssBaseline,
    createMuiTheme,
    withStyles,
    Paper
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
        classes: PropTypes.object
    };

    render() {
        const { childProps, classes } = this.props;

        /*
            Performance Considerations:

            - Paper components use box shadows
        */

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.topChartsBackground}>
                    <div className={classes.topChartsContainer}>
                        <Paper elevation={12}>
                            <div id="artists" className={classes.artists}>
                                <Charts {...childProps.artists} />
                            </div>
                        </Paper>
                        <Paper elevation={12}>
                            <div id="tracks" className={classes.tracks}>
                                <Charts {...childProps.tracks} />
                            </div>
                        </Paper>
                    </div>
                </div>

                {/* <div id="audio-features-container">
                    <Pie {...childProps.key} />
                    <Pie {...childProps.mode} />
                    <Polar {...childProps.average} />
                </div> */}
            </React.Fragment>
        );
    }
}
