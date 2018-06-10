import React from 'react';
import PropTypes from 'prop-types';

export default class SSRRemover extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.remove();
        }
    }

    render() {
        return this.props.children;
    }
}
