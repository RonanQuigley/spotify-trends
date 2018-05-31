import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    };
    render() {
        const { item } = this.props;
        return <div>{item.name}</div>;
    }
}
