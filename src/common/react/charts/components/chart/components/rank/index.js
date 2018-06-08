import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography, withStyles } from '@material-ui/core';
import styles from './styles';

@hot(module)
@withStyles(styles)
export default class Rank extends PureComponent {
    static propTypes = {
        rank: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { rank, classes } = this.props;
        const { ranking } = classes;
        return (
            <Typography className={ranking} variant="display1">
                {rank}
            </Typography>
        );
    }
}
