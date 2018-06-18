import Theme from 'common/react/common/theme';
import { setupDataPoints } from 'common/react/common/utilities';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { VictoryContainer, VictoryPie } from 'victory';

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
                containerComponent={
                    <VictoryContainer
                        // fixes warnings with SSR
                        containerId={'Chart-App'}
                        responsive={true}
                    />
                }
            />
        );
    }
}
