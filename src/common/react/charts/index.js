import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import UI from 'common/react/common/components/ui';
import Content from 'common/react/charts/components/content';
import Header from 'common/react/common/components/header';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import withState from 'common/react/common/components/state';
import { getLabelKeys } from 'common/react/common/utilities';

@hot(module)
@withState
@withStyles(styles)
export default class Charts extends PureComponent {
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
        const { data, header, onChange, value, classes } = this.props;
        const { root, scrollOuter, scrollInner } = classes;
        const labelKeys = getLabelKeys(data);
        return (
            <div className={root}>
                <Header header={header} />
                <UI labelKeys={labelKeys} value={value} onChange={onChange} />
                <div className={scrollOuter}>
                    <div className={scrollInner}>
                        <Content
                            onChange={onChange}
                            value={value}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
