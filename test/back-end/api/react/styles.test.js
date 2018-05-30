import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Styles from 'src/server/api/react/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - react - api - styles', () => {
    let wrapper;
    beforeEach(() => {
        const styles = (
            <Styles registry={new SheetsRegistry()}>
                <div>App to generate styles from</div>
            </Styles>
        );
        wrapper = shallow(styles);
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('should be able to render', () => {
        expect(wrapper.render()).to.not.be.null;
    });
    describe('JssProvider', () => {
        it('should exist', () => {
            expect(wrapper.find(JssProvider)).to.have.length(1);
        });
        it('should have a registry attribute', () => {
            expect(wrapper.find(JssProvider).props().registry).to.be.a(
                'object'
            );
        });
        it('should have a generate class name attribute', () => {
            expect(wrapper.find(JssProvider).props().generateClassName).to.be.a(
                'function'
            );
        });
    });
});
