import React from 'react';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

export default function Styles(props) {
    const generateClassName = createGenerateClassName();
    return (
        <JssProvider
            registry={props.registry}
            generateClassName={generateClassName}
        >
            {props.children}
        </JssProvider>
    );
}

Styles.propTypes = {
    registry: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
};
