import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

@hot(module)
export default class SSRRemover extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    // Remove the server-side injected CSS.
    componentDidMount() {
        // console.log('SSRRemover');
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return this.props.children;
    }
}
