import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Build from 'src/server/api/react/build';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { id } from 'common/react/api';
import App from 'common/react/index';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - react - build', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Build registry={new SheetsRegistry()} data={{}} id={id.ARTISTS} />
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(wrapper.render()).to.not.be.null;
    });

    describe('App', () => {
        let props;
        beforeEach(() => {
            props = wrapper.find(App).props();
        });

        it('should have a data attribute', () => {
            expect(props.data).to.be.a('object');
        });

        it('should have an id attribute', () => {
            expect(props.id).to.be.a('string');
        });
    });

    describe('JssProvider', () => {
        let props;
        beforeEach(() => {
            props = wrapper.find(JssProvider).props();
        });

        it('should have a registry attribute', () => {
            expect(props.registry).to.be.a('object');
        });

        it('should have a generate class name attribute', () => {
            expect(props.generateClassName).to.be.a('function');
        });
    });
});
