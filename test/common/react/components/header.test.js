import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Header from 'common/react/components/header';
import { Typography, Tabs, Tab } from '@material-ui/core';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('common - react - component - header', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header />);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('rendering', () => {
        it('should render', () => {
            expect(wrapper.render()).to.not.be.null;
        });
    });
    describe('Tabs', () => {
        it('should have labelling', () => {
            const tabs = wrapper.find(Tab);
            tabs.forEach(elem => {
                expect(elem.props().label).to.be.a('string');
            });
        });
    });
    describe('Tab Container', () => {
        let tabContainer;
        beforeEach(() => {
            tabContainer = wrapper.find(Tabs);
        });
        it('should be centred', () => {
            expect(tabContainer.props().centered).to.be.true;
        });
        it('should have a value attribute', () => {
            expect(tabContainer.props().value).to.be.a('number');
        });
        it('should handle a click change', () => {
            tabContainer.props().onChange({}, 1);
            expect(wrapper.state('value')).to.equal(1);
        });
    });
});
