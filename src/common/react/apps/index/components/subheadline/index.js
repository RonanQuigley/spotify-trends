import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, withStyles } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class SubHeadline extends PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        children: PropTypes.string.isRequired
    };

    render() {
        const { classes, children } = this.props;
        return (
            <Typography variant="subheading" className={classes.subHeadline}>
                {children}
                <Divider />
            </Typography>
        );
    }
}
