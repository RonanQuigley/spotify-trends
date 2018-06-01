import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from 'common/react/components/chart/components/icon';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('common - react - components - chart -> icon', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Icon popularity={5} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
});
