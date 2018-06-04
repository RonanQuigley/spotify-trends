import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withRoot from 'charts/root';
import withBaseline from 'common/react/common/components/baseline';
import { CssBaseline } from '@material-ui/core';
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const Fake = () => {
    return <div />;
};

describe('react - common - components - baseline', () => {
    let wrapper;
    beforeEach(() => {
        const HOC = withBaseline(Fake);
        wrapper = shallow(<HOC />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('CssBaseline', () => {
        it('should exist', () => {
            const cssBaseline = wrapper.find(CssBaseline);
            expect(cssBaseline).to.have.length(1);
        });
    });
    describe('wrapped component', () => {
        let wrappedComponent;
        beforeEach(() => {
            wrappedComponent = wrapper.find(Fake);
        });
        it('should exist', () => {
            expect(wrappedComponent).to.have.length(1);
        });
        describe('state', () => {
            it('should contain a value that updates with onChange', () => {
                wrappedComponent.props().onChange({}, 1);
                expect(wrapper.state().value).to.equal(1);
            });
            it('should update the props value attribute with onChange events', () => {
                wrappedComponent.props().onChange({}, 1);
                wrapper.update();
                expect(wrapper.find(Fake).props().value).to.equal(1);
            });
        });
    });
});
