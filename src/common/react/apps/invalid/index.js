import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Typography, withStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader';
import styles from 'common/react/apps/invalid/styles';
import Error from '@material-ui/icons/Error';

@hot(module)
@withStyles(styles)
export default class App extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;

        return (
            <div id="container" className={classes.container}>
                <CssBaseline />
                <div id="icon" className={classes.icon}>
                    <Error color={'action'} />
                </div>
                <div id="text-container" className={classes.textContainer}>
                    <div id="heading" className={classes.heading}>
                        <Typography variant={'headline'}>Oops...</Typography>
                    </div>
                    <div id="message" className={classes.message}>
                        <Typography variant={'body2'}>
                            It looks like you don't currently have enough
                            spotify data to work with. Don't fret, just keep on
                            listening, give it a couple of weeks to build up a
                            record of results and try again.
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}
