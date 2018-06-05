import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chart from 'common/react/polar/components/chart';
import Payload from 'fixtures/spotify/processed-data/payload';

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
});
