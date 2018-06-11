import React, { PureComponent } from 'react';
import Charts from 'charts';
import Pie from 'pie/';
import Polar from 'common/react/polar';
import {
    CssBaseline,
    withStyles,
    Paper,
    Typography,
    Divider
} from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';
import styles from './styles';
@hot(module)
@withStyles(styles, { withTheme: true })
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
                    <div className={classes.headerContainer}>
                        <Typography
                            gutterBottom={false}
                            variant={'display2'}
                            align={'center'}
                            className={classes.heading}
                        >
                            Charts
                        </Typography>
                        <Divider className={classes.divider} light={false} />
                    </div>

                    <div className={classes.topChartsContainer}>
                        <Paper className={classes.paper} elevation={12}>
                            <div id="artists" className={classes.artists}>
                                <Charts {...childProps.artists} />
                            </div>
                        </Paper>
                        <Paper className={classes.paper} elevation={12}>
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
