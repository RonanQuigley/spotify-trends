import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles, Divider } from '@material-ui/core';
import Login from 'common/react/apps/index/components/login';
import styles from './styles';
import Branding from 'common/react/apps/index/components/branding';
import Title from 'common/react/apps/index/components/title';
import Text from 'common/react/apps/index/components/text';
import SubHeadline from 'common/react/apps/index/components/subheadline';
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

                <div id="features">
                    <Headline>Features</Headline>
                    <div id="features-items" className={classes.features}>
                        <div
                            id="feature-item-1"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Charts</SubHeadline>
                            <Text>
                                Discover your listening preferences with a
                                rundown of your top 50 artists and tracks. Your
                                listening habits are sampled across a range of
                                time frames. This includes the past four weeks,
                                six months and all time.
                            </Text>
                        </div>
                        <div
                            id="feature-item-2"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Tonality</SubHeadline>
                            <Text>
                                By using spotify's analysis of your top track's
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
                                Get a sample of your evolving, or maybe even
                                unchanging, musical tastes. Attributes include
                                acousticness, loudness, music danceability and
                                valence; this is a measure of how positive your
                                music choices sound.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
