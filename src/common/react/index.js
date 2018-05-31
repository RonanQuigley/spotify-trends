import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import UI from './components/ui';
import Header from './components/header';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './root';
import { CssBaseline } from '@material-ui/core';

const styles = {
    root: {
        color: 'red'
    }
};
@withRoot
export default class App extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired
    };

    state = {
        value: 0
    };

    onChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { data, id, header } = this.props;
        const { value } = this.state;
        return (
            <CssBaseline>
                <Header header={header} />
                <UI value={value} onChange={this.onChange} />
            </CssBaseline>
        );
    }
}
