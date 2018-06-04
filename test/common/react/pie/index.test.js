import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pie from 'pie/index';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('react - pie - index', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Pie />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
});
