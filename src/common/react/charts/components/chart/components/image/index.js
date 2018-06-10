import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class Image extends PureComponent {
    static propTypes = {
        image: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { image, uri, classes } = this.props;
        const { media } = classes;
        return (
            <a href={uri}>
                <img className={media} src={image} />
            </a>
        );
    }
}
