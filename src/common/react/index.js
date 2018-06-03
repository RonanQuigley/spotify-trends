import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import UI from './components/ui';
import Content from './components/content';
import Header from './components/header';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './root';
import { CssBaseline } from '@material-ui/core';
import styles from './styles';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';

@withRoot
@withStyles(styles)
export default class App extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        classes: PropTypes.object
    };

    state = {
        value: 0
    };

    onChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { data, id, header } = this.props;
        const { root, scrollOuter, scrollInner } = this.props.classes;
        const { value } = this.state;
        return (
            <div className={root}>
                <CssBaseline />
                <Header header={header} />
                <UI value={value} onChange={this.onChange} />
                <div className={scrollOuter}>
                    <div className={scrollInner}>
                        <Content value={value} data={data} />
                    </div>
                </div>
            </div>
        );
    }
}
