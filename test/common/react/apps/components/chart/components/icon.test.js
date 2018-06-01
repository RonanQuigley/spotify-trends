import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from 'common/react/components/chart/components/icon';
import { Star, StarHalf } from '@material-ui/icons';

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
    describe('Stars', () => {
        let star;
        let starHalf;
        beforeEach(() => {
            star = wrapper.find(Star);
            starHalf = wrapper.find(StarHalf);
        });
        describe('Star', () => {
            it('should have 5 of them when the popularity rating is 5', () => {
                expect(star).to.have.length(5);
            });
            it('should be empty when the popularity rating is a half integer', () => {
                wrapper.setProps({ popularity: 0.5 });
                star = wrapper.find(Star);
                expect(star).to.have.length(0);
            });
            it('should contain the correct number of stars for half integer values', () => {
                wrapper.setProps({ popularity: 2.5 });
                star = wrapper.find(Star);
                expect(star).to.have.length(2);
            });
        });

        describe('Star Half', () => {
            it('should be empty when the popularity rating is a whole integer', () => {
                expect(starHalf).to.have.length(0);
            });
            it('should exist when the popularity rating contains a half integer', () => {
                wrapper.setProps({ popularity: 2.5 });
                starHalf = wrapper.find(StarHalf);
                expect(starHalf).to.have.length(1);
            });
        });
    });
});
