import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'charts/theme';
import PropTypes from 'prop-types';
export default function(Component) {
    class Root extends React.Component {
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
