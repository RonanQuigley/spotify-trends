import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popularity from 'common/react/components/chart/components/popularity';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('common - react - components - chart -> popularity', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Popularity rating={5} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
});
