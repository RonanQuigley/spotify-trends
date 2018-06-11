import React, { PureComponent } from 'react';
import classNames from 'classnames';
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

        const headerClasses = classNames(
            classes.headerContainer,
            classes.headerCharts
        );

        const chartsContainerClasses = classNames(
            classes.background,
            classes.topChartsBackground
        );

        const bgClassesPitchMode = classNames(
            classes.background,
            classes.pitchModeBackground
        );

        const bgAverages = classNames(
            classes.background,
            classes.averagesBackground
        );

        const paperClasses = classNames(classes.paperClamp, classes.paper);

        const test = classNames(
            classes.topChartsContainer,
            classes.padChildren
        );

        return (
            <React.Fragment>
                <CssBaseline />
                <div
                    id="top-charts-container"
                    className={chartsContainerClasses}
                >
                    <div className={headerClasses}>
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
                        <Paper className={paperClasses} elevation={12}>
                            <div id="artists" className={classes.artists}>
                                <Charts {...childProps.artists} />
                            </div>
                        </Paper>
                        <Paper className={paperClasses} elevation={12}>
                            <div id="tracks" className={classes.tracks}>
                                <Charts {...childProps.tracks} />
                            </div>
                        </Paper>
                    </div>
                </div>
                <div id="audio-features-container" className={bgAverages}>
                    <div className={headerClasses}>
                        <Typography
                            gutterBottom={false}
                            variant={'display2'}
                            align={'center'}
                            className={classes.heading}
                        >
                            Moods
                        </Typography>
                        <Divider className={classes.divider} light={false} />
                    </div>
                    <Paper className={paperClasses} elevation={12}>
                        <div id="averages" className={classes.averages}>
                            <Polar {...childProps.average} />
                        </div>
                    </Paper>
                </div>
                <div
                    id="pitch-and-mode-container"
                    className={bgClassesPitchMode}
                >
                    <div className={classes.headerContainer}>
                        <Typography
                            gutterBottom={false}
                            variant={'display2'}
                            align={'center'}
                            className={classes.heading}
                        >
                            Tonality
                        </Typography>
                        <Divider className={classes.divider} light={false} />
                    </div>
                    <div className={classes.topChartsContainer}>
                        <Paper className={paperClasses} elevation={12}>
                            <div id="key" className={classes.artists}>
                                <Pie
                                    cornerRadius={6}
                                    padAngle={5}
                                    {...childProps.key}
                                />
                            </div>
                        </Paper>
                        <Paper className={paperClasses} elevation={12}>
                            <div id="mode" className={classes.tracks}>
                                <Pie {...childProps.mode} />
                            </div>
                        </Paper>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
