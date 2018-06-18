import { CssBaseline, withStyles } from '@material-ui/core';
import Branding from 'common/react/apps/index/components/branding';
import Headline from 'common/react/apps/index/components/headline';
import Login from 'common/react/apps/index/components/login';
import SubHeadline from 'common/react/apps/index/components/subheadline';
import Text from 'common/react/apps/index/components/text';
import Title from 'common/react/apps/index/components/title';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import styles from './styles';
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

                <div id="features">
                    <Headline>Features</Headline>
                    <div id="features-items" className={classes.features}>
                        <div
                            id="feature-item-1"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Charts</SubHeadline>
                            <Text>
                                Discover your listening habits with a rundown of
                                your top artists and tracks. Results are
                                gathered across a range of time frames,
                                including the past four weeks, six months and
                                all time.
                            </Text>
                        </div>
                        <div
                            id="feature-item-2"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Tonality</SubHeadline>
                            <Text>
                                By using {`spotify's`} analysis of your top
                                {`track's`}
                                audio features, your preferred key signatures
                                are graphed into a set of easily digesteable pie
                                charts. Your modal preferences will also let you
                                see whether you favour tracks in major or minor
                                keys.
                            </Text>
                        </div>
                        <div
                            id="feature-item-3"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Traits</SubHeadline>
                            <Text>
                                Sample your evolving, or maybe even unchanging,
                                musical tastes. Attributes measured include
                                acousticness, loudness, music danceability and
                                valence, an indication of how positive your
                                music choices sound.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
