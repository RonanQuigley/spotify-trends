import chai, { expect } from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chart from 'common/react/components/chart';
import Payload from 'fixtures/spotify/processed-data/payload';
import Element from 'common/react/components/chart/components/element';

Enzyme.configure({ adapter: new Adapter() });

describe('common - react - components - chart', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Chart data={Payload.tracks.LONG} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('Element', () => {
        let elements;
        beforeEach(() => {
            elements = wrapper.find(Element);
        });
        it('should have the correct length', () => {
            expect(elements).to.have.length(50);
        });
        it('should pass an item from the array into the element', () => {
            elements.forEach(element => {
                expect(element.props().item).to.be.a('object').and.to.not.be
                    .empty;
            });
        });
    });
});
