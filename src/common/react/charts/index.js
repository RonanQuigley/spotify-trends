import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import UI from './components/ui';
import Content from './components/content';
import Header from './components/header';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'common/react/common/components/root';
import { CssBaseline } from '@material-ui/core';
import styles from './styles';
import withBaseline from 'common/react/common/components/baseline';

@withRoot
/* must be wrapped inside root
- this is where the state lives */
@withBaseline
@withStyles(styles)
export default class Charts extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        ssrID: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        map: PropTypes.instanceOf(Map),
        value: PropTypes.number,
        onChange: PropTypes.func,
        classes: PropTypes.object
    };

    render() {
        const { data, header, onChange, value } = this.props;
        const { root, scrollOuter, scrollInner } = this.props.classes;
        return (
            <div className={root}>
                <Header header={header} />
                <UI value={value} onChange={onChange} />
                <div className={scrollOuter}>
                    <div className={scrollInner}>
                        <Content value={value} data={data} />
                    </div>
                </div>
            </div>
        );
    }
}
