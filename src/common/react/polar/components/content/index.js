import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart from 'common/react/polar/components/chart';
import Swipe from 'common/react/common/components/swipe';

export default class Content extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number
    };

    generateCharts = data => {
        return Object.keys(data).map(timeRange => {
            return <Chart key={timeRange} data={data[timeRange]} />;
        });
    };

    render() {
        const { value, data, onChange } = this.props;
        return (
            <Swipe onChange={onChange} index={value}>
                {this.generateCharts(data)}
            </Swipe>
        );
    }
}
