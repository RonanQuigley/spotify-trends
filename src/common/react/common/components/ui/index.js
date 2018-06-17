import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Interface from './components/interface';
import { timeRanges } from 'src/server/api/user-data/url';
import { UILabels } from 'common/react/common/utilities';

export default class UI extends PureComponent {
    static propTypes = {
        value: PropTypes.number.isRequired,
        labelKeys: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };

    setupLabelling = labels => {
        return labels.map(label => UILabels[label]);
    };

    render() {
        const { value, onChange, labelKeys } = this.props;
        const labels = this.setupLabelling(labelKeys);
        return <Interface labels={labels} value={value} onChange={onChange} />;
    }
}
