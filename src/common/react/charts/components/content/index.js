import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import SwipeableViews from 'react-swipeable-views';
import { timeRanges } from 'common/react/common/utilities';
import Chart from 'charts/components/chart';
import Swipe from 'common/react/common/components/swipe';

@hot(module)
export default class Content extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired
    };

    generateCharts = data => {
        return Object.keys(data).map(timeRange => {
            return <Chart key={timeRange} data={data[timeRange]} />;
        });
    };

    render() {
        const { value, data } = this.props;
        return <Swipe index={value}>{this.generateCharts(data)}</Swipe>;
    }
}
