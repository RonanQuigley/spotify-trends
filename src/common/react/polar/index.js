import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withState from 'common/react/common/components/state';
import styles from './styles';
import Content from 'common/react/polar/components/content';
import Header from 'common/react/common/components/header';
import UI from 'common/react/common/components/ui';
import Chart from 'common/react/polar/components/chart';

/* must be wrapped inside root
- this is where the state lives */
@withState
@withStyles(styles)
export default class Polar extends PureComponent {
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
        const { root } = classes;
        return (
            <div className={root}>
                {/* <Header header={header} /> */}
                <UI value={value} onChange={onChange} />
                <Content value={value} data={data} />
            </div>
        );
    }
}
