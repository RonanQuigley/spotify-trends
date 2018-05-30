import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends PureComponent {
    static propTypes = {
        header: PropTypes.string.isRequired
    };
    render() {
        const { header } = this.props;
        return (
            <AppBar>
                <Toolbar>
                    <Typography>{header}</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default hot(module)(Header);
