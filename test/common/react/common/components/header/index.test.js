import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { expect } from 'chai';
import Header from 'common/react/common/components/header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('react - charts - components - header', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header header={'Fake'} />).dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('App Bar', () => {
        let appBar;
        beforeEach(() => {
            appBar = wrapper.find(AppBar);
        });
        it('should exist', () => {
            expect(appBar).to.have.length(1);
        });
        it('should have a position attribute', () => {
            expect(appBar.props().position).to.equal('static');
        });
    });
    describe('Typography', () => {
        it('should contain text', () => {
            const text = wrapper
                .find(Typography)
                .render()
                .text();
            expect(text).to.not.be.empty;
        });
    });
});
