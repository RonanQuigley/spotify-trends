import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Interface from './components/interface';

@hot(module)
export default class UI extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const { value, onChange } = this.props;
        return <Interface value={value} onChange={onChange} />;
    }
}
