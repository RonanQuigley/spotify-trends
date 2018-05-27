import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'common/react/theme/index';
import Header from './components/header';

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
            <CssBaseline>
                <MuiThemeProvider theme={theme}>
                    <Header value={value} onChange={this.onChange} />
                </MuiThemeProvider>
            </CssBaseline>
        );
    }
}

export default hot(module)(App);
