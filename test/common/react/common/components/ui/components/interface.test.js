import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Interface from 'common/react/common/components/ui/components/interface';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import { UILabels } from 'common/react/common/utilities';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('react - charts - component - ui', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Interface
                labels={[...Object.values(UILabels)]}
                value={0}
                onChange={() => {}}
            />
        ).dive();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('rendering', () => {
        it('should render', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });
    });
    describe('App bar', () => {
        let appBar;
        beforeEach(() => {
            appBar = wrapper.find(AppBar);
        });
        it('should exist', () => {
            expect(appBar.props().position).to.equal('static');
        });
    });
    describe('Tab', () => {
        it('should have labelling', () => {
            const tabs = wrapper.find(Tab);
            tabs.forEach(elem => {
                expect(elem.props().label).to.be.a('string');
            });
        });
    });
    describe('Tabs Container', () => {
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
        it('should call props.onChange when the tab has been changed', () => {
            const onChange = sandbox.spy();
            const wrapper = shallow(
                <Interface
                    labels={[...Object.values(UILabels)]}
                    value={0}
                    onChange={onChange}
                />
            ).dive();
            wrapper.find(Tabs).simulate('change');
            expect(onChange).to.be.calledOnce;
        });
    });
});
