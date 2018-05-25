import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    render() {
        const { data } = this.props;
        return <div>React Thing</div>;
    }
}

export default hot(module)(App);
