import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { VictoryPie, VictoryContainer } from 'victory';

@hot(module)
export default class Chart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        classes: PropTypes.object
    };

    setupDataPoints = obj => {
        return Object.keys(obj).map(label => {
            return {
                x: label,
                y: obj[label]
            };
        });
    };

    render() {
        const { data, classes } = this.props;
        const dataPoints = this.setupDataPoints(data);
        return (
            <VictoryPie
                width={700}
                height={700}
                padding={100}
                labels={data => `${data.x}: ${data.y}`}
                data={dataPoints}
                style={{ parent: { margin: '0 auto', overflow: 'visible' } }}
                containerComponent={<VictoryContainer responsive={false} />}
            />
        );
    }
}
