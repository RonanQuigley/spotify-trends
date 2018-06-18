import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
