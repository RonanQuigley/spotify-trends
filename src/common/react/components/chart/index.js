import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Element from './components/element';

@hot(module)
export default class Chart extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    generateAssets = array => {
        return array.map(item => {
            return <Element key={item.name} item={item} />;
        });
    };

    render() {
        const { data } = this.props;
        return <React.Fragment>{this.generateAssets(data)}</React.Fragment>;
    }
}
