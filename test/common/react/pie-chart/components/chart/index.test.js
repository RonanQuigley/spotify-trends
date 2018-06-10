import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chart from 'common/react/pie/components/chart';
import { VictoryPie } from 'victory-pie';
import Payload from 'fixtures/spotify/processed-data/payload';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const fakeModeData = Payload.statistics.tally.mode.SHORT;

describe('common - react - chart', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Chart data={fakeModeData} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('VictoryPie', () => {
        let vicPie;
        beforeEach(() => {
            vicPie = wrapper.find(VictoryPie);
        });
        it('should exist', () => {
            expect(vicPie).to.have.length(1);
        });
        it('should have a data attribute', () => {
            expect(vicPie.props().data).to.deep.equal([
                { x: 'Major', y: 30 },
                { x: 'Minor', y: 20 }
            ]);
        });
    });
});
