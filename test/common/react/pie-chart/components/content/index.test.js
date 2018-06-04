import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from 'common/react/pie/components/content';
import Payload from 'fixtures/spotify/processed-data/payload';
import Chart from 'common/react/pie/components/chart';
import Swipe from 'common/react/common/components/swipe';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.tally.key;

describe('react - pie - components - content', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Content value={1} data={fakeData} />);
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
        it('should exist', () => {
            expect(charts).to.have.length(3);
        });
        it('should contain a data attribute for each generated chart', () => {
            charts.forEach(chart => {
                expect(chart.props().data).to.be.a('object').and.to.not.be
                    .empty;
            });
        });
    });
});
