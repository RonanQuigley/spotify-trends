import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';

@hot(module)
export default class Login extends PureComponent {
    render() {
        return (
            <Button
                color="secondary"
                component={'a'}
                href={'/login'}
                variant="outlined"
                size={'large'}
            >
                Login with Spotify
            </Button>
        );
    }
}
