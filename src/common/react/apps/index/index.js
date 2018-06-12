import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles, Divider } from '@material-ui/core';
import Login from 'common/react/apps/index/components/login';
import styles from './styles';
import Branding from 'common/react/apps/index/components/branding';
import Title from 'common/react/apps/index/components/title';
import Text from 'common/react/apps/index/components/text';
@hot(module)
// this contains global styling changes
@withStyles(styles)
export default class App extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;

        return (
            <div id="container" className={classes.container}>
                <CssBaseline />
                <Title />
                <Divider inset={true} className={classes.divider} />
                <div id="features" className={classes.features}>
                    <Text />
                    <Text />
                    <Text />
                </div>

                <Branding />
                <Login />
            </div>
        );
    }
}
