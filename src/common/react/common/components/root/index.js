import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'common/react/common/theme';
import PropTypes from 'prop-types';
import { getDisplayName } from 'common/react/common/utilities';

export default function(WrappedComponent) {
    class withRoot extends React.PureComponent {
        static propTypes = {
            map: PropTypes.instanceOf(Map),
            ssrID: PropTypes.string.isRequired
        };

        componentDidMount() {
            const { ssrID } = this.props;
            // Remove the server-side injected CSS.
            const jssStyles = document.getElementById(ssrID);
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            /* we take the map property and pass all 
            other props to the component we are wrapping.*/
            const { ...props } = this.props;

            return <WrappedComponent {...props} />;
        }
    }
    withRoot.displayName = `withRoot(${getDisplayName(WrappedComponent)})`;
    return withRoot;
}
