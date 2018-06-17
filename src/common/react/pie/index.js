import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import withState from 'common/react/common/components/state';
import styles from './styles';
import Chart from 'common/react/pie/components/chart';
import Header from 'common/react/common/components/header';
import UI from 'common/react/common/components/ui';
import Content from 'common/react/pie/components/content';
import { getLabelKeys } from 'common/react/common/utilities';

/* must be wrapped inside root
- this is where the state lives */
@withState
@withStyles(styles)
export default class Pie extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        ssrID: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        padAngle: PropTypes.number,
        cornerRadius: PropTypes.number,
        map: PropTypes.instanceOf(Map),
        value: PropTypes.number,
        onChange: PropTypes.func,
        classes: PropTypes.object
    };

    render() {
        const {
            value,
            onChange,
            data,
            classes,
            header,
            padAngle,
            cornerRadius
        } = this.props;
        const { root } = classes;
        const labelKeys = getLabelKeys(data);
        return (
            <div className={root}>
                <Header header={header} />
                <UI labelKeys={labelKeys} value={value} onChange={onChange} />
                <Content
                    cornerRadius={cornerRadius}
                    onChange={onChange}
                    padAngle={padAngle}
                    value={value}
                    data={data}
                />
            </div>
        );
    }
}
