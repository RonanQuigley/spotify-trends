import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import SwipeableViews from 'react-swipeable-views';
import { timeRanges } from 'common/react/common/utilities';
import Chart from 'charts/components/chart';

@hot(module)
export default class Swipe extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        index: PropTypes.number.isRequired
    };

    render() {
        const { index, children } = this.props;
        return <SwipeableViews index={index}>{children}</SwipeableViews>;
    }
}
