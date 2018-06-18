import { Divider, Typography, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './styles';

@withStyles(styles)
export default class Title extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;

        const headingClasses = classNames(classes.heading, classes.font);
        const subheadingClasses = classNames(classes.subheading, classes.font);

        return (
            <React.Fragment>
                <Typography variant="display4" className={headingClasses}>
                    Statisfy
                </Typography>

                <Typography variant="headline" className={subheadingClasses}>
                    A Spotify Music Analyser
                </Typography>
                <Divider className={classes.divider} />
            </React.Fragment>
        );
    }
}
