import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart from 'common/react/pie/components/chart';
import Swipe from 'common/react/common/components/swipe';

export default class Content extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        padAngle: PropTypes.number,
        value: PropTypes.number
    };

    generateCharts = (data, padAngle) => {
        return Object.keys(data).map(timeRange => {
            return (
                <Chart
                    padAngle={padAngle}
                    key={timeRange}
                    data={data[timeRange]}
                />
            );
        });
    };

    render() {
        const { value, data, padAngle } = this.props;
        return (
            <Swipe index={value}>{this.generateCharts(data, padAngle)}</Swipe>
        );
    }
}
