import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
@hot(module)
@withStyles(styles)
export default class Login extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };
    render() {
        const { classes } = this.props;
        return (
            <Button
                className={classes.button}
                color="secondary"
                component={'a'}
                href={'/login'}
                variant="raised"
                size={'large'}
            >
                Login with Spotify
            </Button>
        );
    }
}
