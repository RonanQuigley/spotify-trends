import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import SwipeableViews from 'react-swipeable-views';
import { timeRanges } from 'common/react/utilities';
import Chart from 'common/react/components/chart';

@hot(module)
export default class Content extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired
    };

    render() {
        const { value, data } = this.props;
        const short = data[timeRanges.SHORT];
        const medium = data[timeRanges.MEDIUM];
        const long = data[timeRanges.LONG];
        return (
            <SwipeableViews index={value}>
                <Chart data={short} />
                <Chart data={medium} />
                <Chart data={long} />
            </SwipeableViews>
        );
    }
}
