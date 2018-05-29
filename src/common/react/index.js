import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header';
class App extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired
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
        const { data, id } = this.props;
        const { value } = this.state;
        return (
            <CssBaseline>
                <Header value={value} onChange={this.onChange} />
            </CssBaseline>
        );
    }
}

export default hot(module)(App);
