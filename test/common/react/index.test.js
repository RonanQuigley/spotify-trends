import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/common/react/index';
import chaiEnzyme from 'chai-enzyme';
import { wrap } from 'module';
chai.use(sinonChai);
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('common - react - index', () => {
    afterEach(() => {
        sandbox.restore();
    });
    it('should pass in the data via', () => {
        // const wrapper = shallow(<App />);
        // wrapper.instance().props;
    });
});
