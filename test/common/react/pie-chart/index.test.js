import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Header from 'common/react/common/components/header';
import UI from 'common/react/common/components/ui';
import Content from 'common/react/pie/components/content';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Payload from 'fixtures/spotify/processed-data/payload';
import Pie from 'pie';
import React from 'react';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.tally.key;

describe('react - pie - index', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Pie
                data={fakeData}
                ssrID={'Fake'}
                header={'Fake'}
                map={new Map()}
            />
        )
            .dive()
            .dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('Content', () => {
        let content;
        beforeEach(() => {
            content = wrapper.find(Content);
        });
        it('should exist', () => {
            expect(content).to.have.length(1);
        });
        it('should contain a value attribute', () => {
            expect(content.props().value).to.be.a('number');
        });
        it('should contain a data attribute', () => {
            expect(content.props().data).to.be.a('object');
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
        it('should contain a header attribute', () => {
            expect(header.props().header).to.be.a('string').and.to.not.be.empty;
        });
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
        it('should have a label keys attribute', () => {
            expect(ui.props().labelKeys).to.be.a('array');
        });
    });
});
