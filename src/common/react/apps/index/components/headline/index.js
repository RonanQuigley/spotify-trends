import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, withStyles } from '@material-ui/core';
import styles from './styles';
@withStyles(styles)
export default class Headline extends PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        children: PropTypes.string.isRequired
    };

    render() {
        const { classes, children } = this.props;

        return (
            <div id="headline" className={classes.headline}>
                <Typography variant="headline" className={classes.typography}>
                    {children}
                    <Divider className={classes.divider} />
                </Typography>
            </div>
        );
    }
}
