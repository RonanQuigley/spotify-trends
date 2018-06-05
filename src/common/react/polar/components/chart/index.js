import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
    VictoryPolarAxis,
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryCursorContainer
} from 'victory';

// testing out victory chart components
@hot(module)
export default class Chart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <VictoryChart
                    theme={VictoryTheme.grayscale}
                    polar={true}
                    height={400}
                    width={400}
                >
                    <VictoryPolarAxis
                        tickValues={[
                            'Acousticness',
                            'Energy',
                            'Danceability',
                            'Valence',
                            'Loudness'
                        ]}
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
                        data={[
                            { x: 'Acousticness', y: 0.1 },
                            { x: 'Energy', y: 0.2 },
                            { x: 'Danceability', y: 0.3 },
                            { x: 'Valence', y: 0.5 },
                            { x: 'Loudness', y: 0.9 }
                        ]}
                    />
                </VictoryChart>
            </div>
        );
    }
}
