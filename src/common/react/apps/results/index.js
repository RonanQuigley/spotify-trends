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
    Divider,
    AppBar,
    Toolbar
} from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';
import styles from './styles';
import ChartContainer from 'common/react/apps/results/components/chart-container';
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

            To Do:

            - break down into separate components
            - refactor components outside the apps folder 
            so that they are inside the results app folder.
            currently a refactoring nightmare so will leave until basic 
            and responsive styling is out of the way  

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

        const pitchModeContainerClasses = classNames(
            classes.background,
            classes.pitchModeBackground
        );

        const bgAverages = classNames(
            classes.background,
            classes.averagesBackground
        );

        return (
            <React.Fragment>
                <CssBaseline />
                <div id="page-title-container">
                    <AppBar position="static" className={classes.pageTitleBar}>
                        <Toolbar>
                            <Typography
                                variant="display2"
                                className={classes.pageTitle}
                            >
                                Results
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
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

                    <div className={classes.flexbox}>
                        <ChartContainer>
                            <div id="artists" className={classes.artists}>
                                <Charts {...childProps.artists} />
                            </div>
                        </ChartContainer>
                        <ChartContainer>
                            <div id="tracks" className={classes.tracks}>
                                <Charts {...childProps.tracks} />
                            </div>
                        </ChartContainer>
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
                            Traits
                        </Typography>
                        <Divider className={classes.divider} light={false} />
                    </div>
                    <ChartContainer>
                        <div id="averages" className={classes.averages}>
                            <Polar {...childProps.average} />
                        </div>
                    </ChartContainer>
                </div>
                <div
                    id="pitch-and-mode-container"
                    className={pitchModeContainerClasses}
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
                    <div className={classes.flexbox}>
                        <ChartContainer>
                            <div id="key" className={classes.artists}>
                                <Pie
                                    cornerRadius={6}
                                    padAngle={5}
                                    {...childProps.key}
                                />
                            </div>
                        </ChartContainer>
                        <ChartContainer>
                            <div id="mode" className={classes.tracks}>
                                <Pie {...childProps.mode} />
                            </div>
                        </ChartContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
