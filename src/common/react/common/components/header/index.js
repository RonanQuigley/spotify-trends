import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './styles';

@withStyles(styles)
export default class Header extends PureComponent {
    static propTypes = {
        header: PropTypes.string.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { header, classes } = this.props;
        return (
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography
                        className={classes.typography}
                        variant="headline"
                        color="inherit"
                    >
                        {header}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
