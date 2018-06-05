import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Chart from 'common/react/polar/components/chart';
import Swipe from 'common/react/common/components/swipe';

@hot(module)
export default class Content extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        component: PropTypes.func.isRequired,
        value: PropTypes.number
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
