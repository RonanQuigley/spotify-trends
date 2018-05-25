import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/common/react';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('common - react - index', () => {
    afterEach(() => {
        sandbox.restore();
    });
    it('should call render', () => {
        sandbox.spy(App.prototype, 'render');
        // const wrapper = mount(<App />);
        // expect(wrapper.render).to.be.calledOnce;
    });
});
