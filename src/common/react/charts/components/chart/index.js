import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Element from './components/element';

export default class Chart extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    generateAssets = array => {
        return array.map((item, index) => {
            return <Element key={item.name} item={item} rank={index + 1} />;
        });
    };

    render() {
        const { data } = this.props;
        return <React.Fragment>{this.generateAssets(data)}</React.Fragment>;
    }
}
