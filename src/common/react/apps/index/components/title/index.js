import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography, withStyles, Divider } from '@material-ui/core';
import styles from './styles';
import classNames from 'classnames';

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
            </React.Fragment>
        );
    }
}
