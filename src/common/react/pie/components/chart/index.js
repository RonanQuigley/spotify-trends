import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { VictoryPie, VictoryContainer } from 'victory';
import { setupDataPoints } from 'common/react/common/utilities';
import Theme from 'common/react/common/theme';

@hot(module)
export default class Chart extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        padAngle: PropTypes.number,
        cornerRadius: PropTypes.number
    };

    render() {
        const { data, padAngle, cornerRadius } = this.props;
        const typography = Theme.typography;
        const dataPoints = setupDataPoints(data);
        return (
            <VictoryPie
                width={600}
                height={600}
                padding={100}
                // labelRadius={215}
                cornerRadius={cornerRadius}
                padAngle={padAngle}
                labels={data => `${data.x}: ${data.y}`}
                data={dataPoints}
                style={{
                    parent: {
                        margin: '0 auto',
                        overflowX: 'visible',
                        overflowY: 'hidden'
                    },
                    labels: {
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSize,
                        fontWeight: typography.fontWeightRegular
                    }
                }}
                // fixes warnings with SSR
                containerComponent={
                    <VictoryContainer
                        containerId={'Chart-App'}
                        responsive={true}
                    />
                }
            />
        );
    }
}
