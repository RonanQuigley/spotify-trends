import { withStyles } from '@material-ui/core/styles';
import Header from 'common/react/common/components/header';
import withState from 'common/react/common/components/state';
import UI from 'common/react/common/components/ui';
import { getLabelKeys } from 'common/react/common/utilities';
import Content from 'common/react/pie/components/content';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './styles';

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
