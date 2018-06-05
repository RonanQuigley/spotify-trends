import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
    VictoryPolarAxis,
    VictoryChart,
    VictoryBar,
    VictoryTheme
} from 'victory';
import { setupDataPoints } from 'common/react/common/utilities';

@hot(module)
export default class Chart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    getTickValues = array => {
        return array.map(obj => {
            return obj.x;
        });
    };
    render() {
        const { data } = this.props;
        const dataPoints = setupDataPoints(data);
        const tickValues = this.getTickValues(dataPoints);
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <VictoryChart
                    theme={VictoryTheme.grayscale}
                    polar={true}
                    scale={{ x: 'linear', y: 'sqrt' }}
                    height={400}
                    width={400}
                >
                    <VictoryPolarAxis
                        tickValues={tickValues}
                        labelPlacement={'vertical'}
                    />
                    <VictoryPolarAxis
                        dependentAxis
                        style={{
                            axis: { stroke: 'none' },
                            tickLabels: { fill: 'none' },
                            grid: { stroke: 'grey', strokeDasharray: '4, 8' }
                        }}
                        tickValues={[0.2, 0.4, 0.6, 0.8, 1.0]}
                        labelPlacement={'vertical'}
                        axisAngle={90}
                        tickCount={8}
                    />
                    <VictoryBar
                        style={{ data: { fill: '#c43a31', width: 80 } }}
                        data={dataPoints}
                    />
                </VictoryChart>
            </div>
        );
    }
}
