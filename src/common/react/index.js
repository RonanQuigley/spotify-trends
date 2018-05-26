import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'common/react/theme/index';
class App extends Component {
    render() {
        return (
            <CssBaseline>
                <MuiThemeProvider theme={theme}>
                    <div>Hello World</div>
                </MuiThemeProvider>
            </CssBaseline>
        );
    }
}

export default hot(module)(App);
