import chai, { expect } from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from 'src/common/react/components/content';
import Payload from 'fixtures/spotify/processed-data/payload';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import Chart from 'src/common/react/components/chart';

Enzyme.configure({ adapter: new Adapter() });

describe('', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Content value={1} data={Payload.tracks} />);
    });
    it('should render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('swipeable views', () => {
        let swipeableViews;
        beforeEach(() => {
            swipeableViews = wrapper.find(SwipeableViews);
        });
        it('should exist', () => {
            expect(swipeableViews).to.have.length(1);
        });
        describe('attributes', () => {
            it('should have an index', () => {
                wrapper.setState({
                    value: 1
                });
                wrapper.update();
                expect(swipeableViews.props().index).to.be.equal(1);
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
