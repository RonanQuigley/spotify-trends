import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import { getDisplayName } from 'common/react/common/utilities';

export default function(WrappedComponent) {
    class Baseline extends React.Component {
        static propTypes = {
            classes: PropTypes.object
        };

        state = {
            value: 0
        };

        onChange = (event, value) => {
            this.setState({ value });
        };

        render() {
            const { ...props } = this.props;
            const { value } = this.state;

            return (
                <CssBaseline>
                    <WrappedComponent
                        value={value}
                        onChange={this.onChange}
                        {...props}
                    />
                </CssBaseline>
            );
        }
    }
    Baseline.displayName = `Baseline(${getDisplayName(WrappedComponent)})`;
    return Baseline;
}
