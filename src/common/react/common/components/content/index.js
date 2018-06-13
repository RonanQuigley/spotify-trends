import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Chart from 'common/react/polar/components/chart';
import Swipe from 'common/react/common/components/swipe';

export default class Content extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        component: PropTypes.func.isRequired,
        padAngle: PropTypes.number,
        value: PropTypes.number
    };

    generateCharts = (data, Component) => {
        const padAngle = this.props.padAngle;
        return Object.keys(data).map(timeRange => {
            return (
                <Component
                    padAngle={padAngle}
                    key={timeRange}
                    data={data[timeRange]}
                />
            );
        });
    };

    render() {
        const { value, data, component } = this.props;
        return (
            <Swipe index={value}>{this.generateCharts(data, component)}</Swipe>
        );
    }
}