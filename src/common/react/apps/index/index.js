import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles } from '@material-ui/core';
import Login from 'common/react/login';
import styles from './styles';
import Branding from 'common/react/branding';
@hot(module)
// this contains global styling changes
@withStyles(styles)
export default class App extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Branding />
                <Login />
            </React.Fragment>
        );
    }
}
