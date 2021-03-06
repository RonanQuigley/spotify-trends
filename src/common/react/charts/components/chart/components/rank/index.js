import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import styles from './styles';

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
