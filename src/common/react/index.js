import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'common/react/theme/index';
import Header from './components/header';
import { SheetsManager } from 'react-jss/lib/jss';

class App extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired
    };

    state = {
        value: 0
    };

    onChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { data, id } = this.props;
        const { value } = this.state;
        return (
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                <CssBaseline>
                    <Header value={value} onChange={this.onChange} />
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default hot(module)(App);
