import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Email from '../../../src/common/react/index';
import chaiEnzyme from 'chai-enzyme';
import { wrap } from 'module';
chai.use(sinonChai);
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

// describe('<Email>', function() {
//     it('should have an input for the email', function() {
//         const wrapper = shallow(<Email />);
//         expect(wrapper.find('input')).to.have.length(1);
//     });

//     it('should have a button', function() {
//         const wrapper = shallow(<Email />);
//         expect(wrapper.find('button')).to.have.length(1);
//     });
// });

describe('', () => {
    afterEach(() => {
        sandbox.restore();
    });
    it('', () => {
        // sandbox.spy(Email.prototype, 'sampleMethod');
        sandbox.spy(Email.prototype, 'componentDidMount');
        const wrapper = mount(<Email prop={'foo'} />); // mount/render/shallow when applicable
        expect(wrapper.find('#checked')).to.be.checked();
        expect(wrapper.find('#not')).to.not.be.checked();
        expect(Email.prototype.componentDidMount).to.be.calledOnce;
        // wrapper.instance().boundFunction();
        const instance = wrapper.instance();
        sandbox.spy(instance, 'boundFunction');
        instance.forceUpdate();
        expect(instance.boundFunction).to.be.called;
        const res = wrapper.find({ prop: 'foo' });
        expect(res).to.have.length(1);
    });
});
