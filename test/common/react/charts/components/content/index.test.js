import chai, { expect } from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from 'charts/components/content';
import Payload from 'fixtures/spotify/processed-data/payload';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import Chart from 'charts/components/chart';
import Swipe from 'common/react/common/components/swipe';

Enzyme.configure({ adapter: new Adapter() });

describe('react - charts - components - content', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Content value={1} data={Payload.tracks} />);
    });
    it('should render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('Swipe', () => {
        let swipe;
        beforeEach(() => {
            swipe = wrapper.find(Swipe);
        });
        it('should exist', () => {
            expect(swipe).to.have.length(1);
        });
        describe('attributes', () => {
            it('should have an index', () => {
                wrapper.setState({
                    value: 1
                });
                wrapper.update();
                expect(swipe.props().index).to.be.equal(1);
            });
        });
    });

    describe('Chart', () => {
        let charts;

        beforeEach(() => {
            charts = wrapper.find(Chart);
        });

        it('should exist for each time range', () => {
            expect(charts).to.have.length(3);
        });

        it('should have a data attribute', () => {
            charts.forEach(chart => {
                expect(chart.props().data).to.be.a('array').and.to.not.be.empty;
            });
        });
    });
});
