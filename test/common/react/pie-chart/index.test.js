import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pie from 'pie';
import { styleID } from 'src/server/api/react/utilities';
import Chart from 'common/react/pie/components/chart';
import Payload from 'fixtures/spotify/processed-data/payload';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.tally.key;

describe('react - pie - index', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Pie
                data={fakeData}
                ssrID={styleID.KEY}
                header={'Fake'}
                map={new Map()}
            />
        )
            .dive()
            .dive()
            .dive()
            .dive()
            .dive()
            .dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
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
