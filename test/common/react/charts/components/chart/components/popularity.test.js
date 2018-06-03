import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popularity from 'charts/components/chart/components/popularity';
import Icon from 'charts/components/chart/components/icon';

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
    describe('Icon', () => {
        let icon;
        beforeEach(() => {
            icon = wrapper.find(Icon);
        });
        it('should exist', () => {
            expect(icon.props().popularity)
                .to.be.a('number')
                .and.to.be.within(0, 5);
        });
    });
});
