import chai, { expect } from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UI from 'common/react/common/components/ui';
import Interface from 'common/react/common/components/ui/components/interface';
Enzyme.configure({ adapter: new Adapter() });

describe('react - charts - components - ui - container', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<UI onChange={() => {}} value={0} />);
    });

    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('UI Interface', () => {
        let uiInterface;
        beforeEach(() => {
            uiInterface = wrapper.find(Interface);
        });
        it('should exist', () => {
            expect(uiInterface).to.have.length(1);
        });
        it('should have a value attribute', () => {
            expect(uiInterface.props().value).to.equal(0);
        });
        it('should have a onChange attribute', () => {
            expect(uiInterface.props().onChange).to.be.a('function');
        });
    });
});
