import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Element from 'common/react/components/chart/components/element';
import Payload from 'fixtures/spotify/processed-data/payload';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Element item={Payload.tracks.LONG[0]} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    it('should return a render wrapped in a div', () => {
        expect(wrapper.getElement().type).to.equal('div');
    });
});
