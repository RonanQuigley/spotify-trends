import React from 'react';
import App from 'common/react/index';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import theme from 'common/react/theme/index';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default function Build(props) {
    const generateClassName = createGenerateClassName();
    return (
        <JssProvider
            registry={props.registry}
            generateClassName={generateClassName}
        >
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                <App data={props.data} id={props.id} />
            </MuiThemeProvider>
        </JssProvider>
    );
}

Build.propTypes = {
    registry: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};
