import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class ChartContainer extends PureComponent {
    static propTypes = {
        children: PropTypes.object.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { classes, children } = this.props;

        return (
            <Paper className={classes.paper} elevation={12}>
                {children}
            </Paper>
        );
    }
}
