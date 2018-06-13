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
                                Discover your listening preferences with a chart
                                based rundown of your top 50 artists and tracks.
                                Your listening habits are sampled from a range
                                of time frames. Ranges includes the past four
                                weeks, six months and all time.
                            </Text>
                        </div>
                        <div
                            id="feature-item-2"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Tonality</SubHeadline>
                            <Text>
                                By using spotify's audio features analysis of
                                your top 50 tracks, your preferred key
                                signatures are graphed into a set of easily
                                digesteable pie charts. Furthermore, your modal
                                preferences will let you see whether you favour
                                tracks that in major or minor keys.
                            </Text>
                        </div>
                        <div
                            id="feature-item-3"
                            className={classes.featureItem}
                        >
                            <SubHeadline>Traits</SubHeadline>
                            <Text>
                                Allows you to see an overview of your evolved
                                (or potentially unchanging!) musical tastes over
                                time. Attributes include track acousticness,
                                loudness, song danceability and valence - this
                                is a measure of how positive your music choices
                                sound.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
