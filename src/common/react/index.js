import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import UI from './components/ui';
import Header from './components/header';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'common/react/theme';

class App extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        map: PropTypes.object
    };

    state = {
        value: 0
    };

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    onChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { data, id, header, map } = this.props;
        const { value } = this.state;
        return (
            <MuiThemeProvider theme={theme} sheetsManager={map}>
                <CssBaseline>
                    <Header header={header} />
                    <UI value={value} onChange={this.onChange} />
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default hot(module)(App);
