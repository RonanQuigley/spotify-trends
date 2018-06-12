import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles, Paper } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class Text extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;
        return (
            <Typography variant="body2" className={classes.typography}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                velit eget nulla tincidunt feugiat. Proin ac suscipit tellus.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Suspendisse lectus dui, vestibulum a blandit id, ultricies sed
                diam. Ut scelerisque dolor eget dolor vehicula tincidunt.
                Vestibulum sed ultricies nibh. Nullam elit tellus, tincidunt sed
                pharetra ut, fermentum non sem. Vivamus tincidunt sem sit amet
                felis congue, ac ornare mauris condimentum. Nullam vitae libero
                sed sapien sagittis hendrerit. Quisque non tellus est. Duis eros
                eros, dictum viverra consectetur nec, tincidunt at purus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos. Vestibulum non tempor tortor. Etiam
                semper tellus vitae tellus semper, a ultrices dolor consectetur.
                In pellentesque purus volutpat commodo dictum. Donec lacus nisi,
                fringilla vitae mauris non, efficitur sollicitudin augue.
            </Typography>
        );
    }
}
