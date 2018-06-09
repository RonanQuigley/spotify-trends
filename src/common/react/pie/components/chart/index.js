import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { VictoryPie, VictoryContainer } from 'victory';
import { setupDataPoints } from 'common/react/common/utilities';

export default class Chart extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { data, classes } = this.props;
        const dataPoints = setupDataPoints(data);
        return (
            <VictoryPie
                width={600}
                height={600}
                padding={100}
                labels={data => `${data.x}: ${data.y}`}
                data={dataPoints}
                style={{
                    parent: {
                        margin: '0 auto',
                        overflowX: 'visible',
                        overflowY: 'hidden'
                    }
                }}
                // fixes warnings with SSR
                containerComponent={
                    <VictoryContainer
                        containerId={'Chart-App'}
                        responsive={false}
                    />
                }
            />
        );
    }
}
