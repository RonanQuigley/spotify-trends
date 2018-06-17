import { expect } from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UI from 'common/react/common/components/ui';
import Interface from 'common/react/common/components/ui/components/interface';
import { UILabels } from 'common/react/common/utilities';
Enzyme.configure({ adapter: new Adapter() });

describe('react - charts - components - ui - container', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <UI
                labelKeys={['SHORT', 'MEDIUM', 'LONG']}
                onChange={() => {}}
                value={0}
            />
        );
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
        describe('labels attribute', () => {
            it('should have labels for all three time periods', () => {
                expect(uiInterface.props().labels)
                    .to.be.a('array')
                    .and.to.eql(Object.values(UILabels));
            });
            it('should have labels for the two inputted time periods', () => {
                wrapper = shallow(
                    <UI
                        labelKeys={['MEDIUM', 'LONG']}
                        onChange={() => {}}
                        value={0}
                    />
                );
                uiInterface = wrapper.find(Interface);
                expect(uiInterface.props().labels)
                    .to.be.a('array')
                    .and.to.eql(['Six Months', 'All Time']);
            });
        });
    });
});
