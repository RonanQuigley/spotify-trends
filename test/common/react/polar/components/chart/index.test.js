import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chart from 'common/react/polar/components/chart';
import Payload from 'fixtures/spotify/processed-data/payload';
import { VictoryChart, VictoryPolarAxis, VictoryBar } from 'victory';
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.average.LONG;

describe('react - polar - components - chart', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Chart data={fakeData} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('VictoryChart', () => {
        let vChart;
        beforeEach(() => {
            vChart = wrapper.find(VictoryChart);
        });
        it('should exist', () => {
            expect(vChart).to.have.length(1);
        });
        it('should be set to polar', () => {
            expect(vChart.props().polar).to.be.true;
        });
    });
    describe('VictoryPolarAxis', () => {
        let vPolarAxis;
        beforeEach(() => {
            vPolarAxis = wrapper.find(VictoryPolarAxis);
        });
        it('should have the correct length', () => {
            expect(vPolarAxis).to.have.length(2);
        });

        it('should only have one of the two components acting as the dependent axis', () => {
            const count = vPolarAxis
                .map(component => {
                    return component.props().dependentAxis;
                })
                .filter(prop => prop);
            expect(count.length).to.equal(1);
        });
        it('should have a tickValues attribute', () => {
            vPolarAxis.forEach(component => {
                expect(component.props().tickValues).to.be.a('array').and.to.not
                    .be.empty;
            });
        });
    });
    describe('VictoryBar', () => {
        it('should have a data attribute', () => {
            expect(wrapper.find(VictoryBar).props().data).to.be.a('array').and
                .to.not.be.empty;
        });
    });
});
