import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core';
import styles from './styles';
@withStyles(styles)
export default class Swipe extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        index: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { index, children, classes } = this.props;
        return (
            <SwipeableViews className={classes.test} index={index}>
                {children}
            </SwipeableViews>
        );
    }
}
