import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/common/react/index';
import UI from '../../../src/common/react/components/ui';
import chaiEnzyme from 'chai-enzyme';
chai.use(sinonChai);
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('common - react - index', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App data={{}} id={'fake'} />);
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should render', () => {
        expect(wrapper.render()).to.not.be.null;
    });
    describe('Header', () => {
        let header;
        beforeEach(() => {
            header = wrapper.find(UI);
        });
        it('should have a value attribute', () => {
            expect(header.props().value).to.be.a('number');
        });
        it('should have an onChange attribute', () => {
            expect(header.props().onChange).to.be.a('function');
        });
        it('should update the state with onChange events', () => {
            header.props().onChange({}, 1);
            expect(wrapper.state().value).to.equal(1);
        });
        it('should update the value attribute with onChange events', () => {
            header.props().onChange({}, 1);
            wrapper.update();
            expect(wrapper.find(UI).props().value).to.equal(1);
        });
    });
});
