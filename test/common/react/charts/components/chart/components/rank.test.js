import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rank from 'charts/components/chart/components/rank';
import { Typography } from '@material-ui/core';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const testValue = 1;

describe('react - charts - components - chart -> rank', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Rank rank={testValue} />).dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('Typography', () => {
        let typography;
        beforeEach(() => {
            typography = wrapper.find(Typography);
        });
        it('should exist', () => {
            expect(typography).to.have.length(1);
        });
        it('should contain the rank passed from the props', () => {
            expect(typography).to.contain(testValue);
        });
    });
});
