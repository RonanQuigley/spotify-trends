import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { labels } from 'common/react/utilities';
import { AppBar, Tabs, Tab } from '@material-ui/core';

class Header extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired
    };

    generateLabels = () => {
        return labels.map(label => {
            return <Tab key={label} label={label} />;
        });
    };

    render() {
        const { value, onChange } = this.props;
        return (
            <AppBar>
                <Tabs value={value} onChange={onChange} centered={true}>
                    {this.generateLabels()}
                </Tabs>
            </AppBar>
        );
    }
}

export default hot(module)(Header);
