import React, { Component } from 'react';
import PropTypes from 'prop-types';
import spotifyIcon from 'common/assets/spotify-icon.svg';

export default class Branding extends Component {
    render() {
        return <div>{spotifyIcon}</div>;
    }
}
