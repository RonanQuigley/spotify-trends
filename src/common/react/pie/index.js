import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
    VictoryPie,
    VictoryContainer,
    VictoryLabel,
    VictoryTheme
} from 'victory';

@hot(module)
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

    render() {
        const { value, onChange } = this.props;
        return <div>HELLO</div>;
    }
}
