const React = require('react');
const ReactDOM = require('react-dom/server');

class Test extends React.Component{
    
    _handleClick = function() {
        alert();
    }
    render(){
        return (
            <div>
                <h1>Hello World!</h1>
                <p>Isn't server-side rendering remarkable?</p>
                <button onClick={this._handleClick}>Click Me</button>
            </div>
        );
    }
}

module.exports = ReactDOM.renderToString(<Test />);