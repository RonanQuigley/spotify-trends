import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core';
import styles from './styles';

@hot(module)
@withStyles(styles)
export default class Image extends Component {
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
