import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'common/react/theme';
import PropTypes from 'prop-types';

export default function(Component) {
    class Root extends React.Component {
        static propTypes = {
            map: PropTypes.instanceOf(Map)
        };

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            /* we take the map property and pass all 
            other props to the component we are wrapping */

            const { map, ...props } = this.props;

            return (
                <MuiThemeProvider theme={theme} sheetsManager={map}>
                    <Component {...props} />
                </MuiThemeProvider>
            );
        }
    }
    return Root;
}
