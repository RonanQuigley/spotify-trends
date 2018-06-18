import { UILabels } from 'common/react/common/utilities';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Interface from './components/interface';

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
