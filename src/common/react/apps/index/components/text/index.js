import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class Text extends PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
            .isRequired
    };

    render() {
        const { classes, children } = this.props;
        return (
            <React.Fragment>
                <Typography className={classes.typography}>
                    {children}
                </Typography>
            </React.Fragment>
        );
    }
}
