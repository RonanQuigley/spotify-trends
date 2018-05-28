import { createGenerateClassName } from '@material-ui/core/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { renderToString } from 'react-dom/server';
import App from 'common/react/index';
import PropTypes from 'prop-types';

export function renderApp(build) {
    return {
        app: renderToString(build.app),
        registry: build.registry
    };
}

export function buildApp(data, id) {
    const registry = new SheetsRegistry();
    return {
        app: <Build data={data} id={id} registry={registry} />,
        registry: registry
    };
}

const Build = props => {
    const generateClassName = createGenerateClassName();
    return (
        <JssProvider
            registry={props.registry}
            generateClassName={generateClassName}
        >
            <App data={props.data} id={props.id.tracks} />
        </JssProvider>
    );
};

Build.propTypes = {
    registry: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};
