import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { labels } from 'common/react/utilities';
import { AppBar, Tabs, Tab } from '@material-ui/core';

class Header extends PureComponent {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    generateLabels = () => {
        return labels.map(label => {
            return <Tab key={label} label={label} />;
        });
    };

    render() {
        return (
            <AppBar>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    centered={true}
                >
                    {this.generateLabels()}
                </Tabs>
            </AppBar>
        );
    }
}

export default hot(module)(Header);
