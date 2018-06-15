import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

export default class Swipe extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        index: PropTypes.number.isRequired
    };

    render() {
        const { index, children } = this.props;
        return (
            <SwipeableViews
                style={{ transform: 'translate3d(0,0,0)' }}
                index={index}
            >
                {children}
            </SwipeableViews>
        );
    }
}
