import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import styles from './styles';

@hot(module)
@withStyles(styles)
export default class Header extends PureComponent {
    static propTypes = {
        header: PropTypes.string.isRequired,
        classes: PropTypes.object
    };
    render() {
        const { header } = this.props;
        const { typography } = this.props.classes;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={typography}
                        variant="title"
                        color="inherit"
                    >
                        {header}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
