import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart from 'common/react/pie/components/chart';
import Swipe from 'common/react/common/components/swipe';

export default class Content extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        padAngle: PropTypes.number,
        cornerRadius: PropTypes.number,
        value: PropTypes.number
    };

    generateCharts = (data, padAngle, cornerRadius) => {
        return Object.keys(data).map(timeRange => {
            return (
                <Chart
                    padAngle={padAngle}
                    key={timeRange}
                    cornerRadius={cornerRadius}
                    data={data[timeRange]}
                />
            );
        });
    };

    render() {
        const { value, data, padAngle, cornerRadius, onChange } = this.props;
        return (
            <Swipe onChange={onChange} index={value}>
                {this.generateCharts(data, padAngle, cornerRadius)}
            </Swipe>
        );
    }
}
