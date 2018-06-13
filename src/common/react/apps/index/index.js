import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles, Divider } from '@material-ui/core';
import Login from 'common/react/apps/index/components/login';
import styles from './styles';
import Branding from 'common/react/apps/index/components/branding';
import Title from 'common/react/apps/index/components/title';
import Text from 'common/react/apps/index/components/text';
import Headline from 'common/react/apps/index/components/headline';
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
                <div
                    id="login-and-branding"
                    className={classes.loginBrandingContainer}
                >
                    <Branding />
                    <Login />
                </div>

                <div id="features" className={classes.features}>
                    <div id="feature-item-1">
                        <Headline>Charts</Headline>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. In a velit eget nulla tincidunt feugiat. Proin
                            ac suscipit tellus. Interdum et malesuada fames ac
                            ante ipsum primis in faucibus. Suspendisse lectus
                            dui, vestibulum a blandit id, ultricies sed diam. Ut
                            scelerisque dolor eget dolor vehicula tincidunt.
                            Vestibulum sed ultricies nibh. Nullam elit tellus,
                            tincidunt sed pharetra ut, fermentum non sem.
                            Vivamus tincidunt sem sit amet felis congue, ac
                            ornare mauris condimentum.
                        </Text>
                    </div>
                    <div id="feature-item-2">
                        <Headline>Tonality</Headline>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. In a velit eget nulla tincidunt feugiat. Proin
                            ac suscipit tellus. Interdum et malesuada fames ac
                            ante ipsum primis in faucibus. Suspendisse lectus
                            dui, vestibulum a blandit id, ultricies sed diam. Ut
                            scelerisque dolor eget dolor vehicula tincidunt.
                            Vestibulum sed ultricies nibh. Nullam elit tellus,
                            tincidunt sed pharetra ut, fermentum non sem.
                            Vivamus tincidunt sem sit amet felis congue, ac
                            ornare mauris condimentum.
                        </Text>
                    </div>
                    <div id="feature-item-3">
                        <Headline>Mood Preferences</Headline>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. In a velit eget nulla tincidunt feugiat. Proin
                            ac suscipit tellus. Interdum et malesuada fames ac
                            ante ipsum primis in faucibus. Suspendisse lectus
                            dui, vestibulum a blandit id, ultricies sed diam. Ut
                            scelerisque dolor eget dolor vehicula tincidunt.
                            Vestibulum sed ultricies nibh. Nullam elit tellus,
                            tincidunt sed pharetra ut, fermentum non sem.
                            Vivamus tincidunt sem sit amet felis congue, ac
                            ornare mauris condimentum.
                        </Text>
                    </div>
                </div>
            </div>
        );
    }
}
