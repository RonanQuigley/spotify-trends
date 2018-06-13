import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
    VictoryPolarAxis,
    VictoryChart,
    VictoryBar,
    VictoryContainer,
    VictoryTheme,
    VictoryClipContainer
} from 'victory';
import { setupDataPoints } from 'common/react/common/utilities';

export default class Chart extends PureComponent {
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
            <VictoryChart
                theme={VictoryTheme.grayscale}
                polar={true}
                padding={30}
                height={400}
                width={500}
                scale={{ x: 'linear', y: 'sqrt' }}
                style={{ parent: { overflow: 'hidden' } }}
                // fixes warnings with SSR
                containerComponent={
                    <VictoryContainer containerId={'Polar-App'} />
                }
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
        );
    }
}