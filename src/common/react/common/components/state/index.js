import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'common/react/common/utilities';

export default function(WrappedComponent) {
    class withState extends PureComponent {
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
                <WrappedComponent
                    value={value}
                    onChange={this.onChange}
                    {...props}
                />
            );
        }
    }
    withState.displayName = `withState(${getDisplayName(WrappedComponent)})`;
    return withState;
}
