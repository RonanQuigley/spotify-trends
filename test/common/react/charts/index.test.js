import chai from 'chai';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from 'charts/index';
import UI from 'charts/components/ui';
import Header from 'charts/components/header';
import chaiEnzyme from 'chai-enzyme';
import { CssBaseline } from '@material-ui/core';
import Content from 'charts/components/content';
import { styleID } from 'src/server/api/react/utilities';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;

describe('react - charts - index', () => {
    let wrapper;
    beforeEach(() => {
        /* the component under test is wrapped in a HOC. We need to
        repeatedly use dive to access the component we want to test
        as using mount won't work */
        wrapper = shallow(
            <App
                data={{}}
                ssrID={styleID.ARTISTS}
                header={'Fake'}
                map={new Map()}
            />
        )
            .dive()
            .dive()
            .dive();
    });
    it('should render', () => {
        wrapper = shallow(
            <App data={{}} id={'fake'} header={'Fake'} map={new Map()} />
        );
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('UI', () => {
        let ui;
        beforeEach(() => {
            ui = wrapper.find(UI);
        });
        it('should have a value attribute', () => {
            expect(ui.props().value).to.be.a('number');
        });
        it('should have an onChange attribute', () => {
            expect(ui.props().onChange).to.be.a('function');
        });
        it('should update the state with onChange events', () => {
            ui.props().onChange({}, 1);

            expect(wrapper.state().value).to.equal(1);
        });
        it('should update the value attribute with onChange events', () => {
            ui.props().onChange({}, 1);
            wrapper.update();
            expect(wrapper.find(UI).props().value).to.equal(1);
        });
    });
    describe('CssBaseline', () => {
        let cssBaseline;
        beforeEach(() => {
            cssBaseline = wrapper.find(CssBaseline);
        });
        it('should exist', () => {
            expect(cssBaseline).to.have.length(1);
        });
    });
    describe('Header', () => {
        let header;
        beforeEach(() => {
            header = wrapper.find(Header);
        });
        it('should exist', () => {
            expect(header).to.have.length(1);
        });
        it('should have a header attribute', () => {
            expect(header.props().header).to.be.a('string');
        });
    });
    describe('Content', () => {
        let content;
        beforeEach(() => {
            content = wrapper.find(Content);
        });
        it('should exist', () => {
            expect(content).to.have.length(1);
        });
        it('should have a value attribute', () => {
            expect(content.props().value).to.be.a('number');
        });
        it('should have a data attribute', () => {
            expect(content.props().data).to.be.a('object');
        });
    });
});
