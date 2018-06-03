import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Image from 'charts/components/chart/components/image';
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Image image={'fake image'} uri={'fake uri'} />
        ).dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('a element', () => {
        it('should contain a href attribute', () => {
            expect(wrapper.find('a').props().href).to.equal('fake uri');
        });
    });
    describe('img element', () => {
        it('should contain a src attribute', () => {
            expect(wrapper.find('img').props().src).to.equal('fake image');
        });
    });
});
