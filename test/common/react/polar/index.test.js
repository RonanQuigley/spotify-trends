import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Polar from 'common/react/polar';
import Payload from 'fixtures/spotify/processed-data/payload';
import Chart from 'common/react/polar/components/chart';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.average;

describe('react - polar - index', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Polar
                data={fakeData}
                ssrID={'Fake'}
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
});
