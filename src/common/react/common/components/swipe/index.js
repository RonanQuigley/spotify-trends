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
        onChange: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    handleIndexChange = index => {
        // we have to wrap this change in a function
        // as we need to make the event call null.
        // otherwise a weird mismatch bug occurs between the ui
        // tabs and the app bar
        this.props.onChange(null, index);
    };

    render() {
        const { index, children, classes } = this.props;
        return (
            <SwipeableViews
                onChangeIndex={this.handleIndexChange}
                className={classes.test}
                index={index}
            >
                {children}
            </SwipeableViews>
        );
    }
}
