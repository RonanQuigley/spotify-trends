import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'common/react/theme/index';
import Header from './components/header';

class App extends Component {
    render() {
        const { data, id } = this.props;
        return (
            <CssBaseline>
                <MuiThemeProvider theme={theme}>
                    <Header />
                </MuiThemeProvider>
            </CssBaseline>
        );
    }
}

export default hot(module)(App);
