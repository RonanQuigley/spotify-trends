import React, { PropTypes } from 'react';
export default class Sample extends React.Component {
    constructor(...args) {
        super(...args);
        this.sampleMethod = this.sampleMethod.bind(this);
    }

    componentDidMount() {}

    boundFunction = () => {
        console.log('i am a bound function');
    };

    sampleMethod() {
        console.log('sample');
    }

    render() {
        this.boundFunction();
        return (
            <div>
                <input id="checked" defaultChecked={true} />
                <input id="not" defaultChecked={false} />
            </div>
        );
    }
}
