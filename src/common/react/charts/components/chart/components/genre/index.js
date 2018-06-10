import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

export default class Genre extends PureComponent {
    static propTypes = {
        genre: PropTypes.string.isRequired
    };

    render() {
        const { genre } = this.props;

        return <Typography variant="caption">{genre}</Typography>;
    }
}
