import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography } from '@material-ui/core';

@hot(module)
export default class Genre extends Component {
    static propTypes = {
        genre: PropTypes.string.isRequired
    };

    render() {
        const { genre } = this.props;

        return <Typography variant="caption">{genre}</Typography>;
    }
}
