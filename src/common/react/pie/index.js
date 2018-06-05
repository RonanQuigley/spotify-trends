import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'common/react/common/components/root';
import withBaseline from 'common/react/common/components/baseline';
import styles from './styles';
import Chart from 'common/react/pie/components/chart';
import Header from 'common/react/common/components/header';
import UI from 'common/react/common/components/ui';
import Content from 'common/react/common/components/content';

@hot(module)
@withRoot
/* must be wrapped inside root
- this is where the state lives */
@withBaseline
@withStyles(styles)
export default class Pie extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        ssrID: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        map: PropTypes.instanceOf(Map),
        value: PropTypes.number,
        onChange: PropTypes.func,
        classes: PropTypes.object
    };

    generateCharts = data => {
        return Object.keys(data).map(timeRange => {
            return <Chart key={timeRange} data={data[timeRange]} />;
        });
    };

    render() {
        const { value, onChange, data, classes, header } = this.props;
        return (
            <React.Fragment>
                <Header header={header} />
                <UI value={value} onChange={onChange} />
                <Content value={value} component={Chart} data={data} />
            </React.Fragment>
        );
    }
}
