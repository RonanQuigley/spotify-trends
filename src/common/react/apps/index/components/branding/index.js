import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpotifyIcon from 'common/assets/spotify-icon-white.svg';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { hot } from 'react-hot-loader';
@hot(module)
@withStyles(styles)
export default class Branding extends Component {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;
        return (
            <div id="spotify-branding" className={classes.brandingContainer}>
                <SpotifyIcon />
            </div>
        );
    }
}
