import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('react - components - login', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
});
