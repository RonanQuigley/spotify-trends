import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from 'common/react/components/header';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('common - react - components - header', () => {
    afterEach(() => {
        sandbox.restore();
    });
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header header={'Fake'} />);
    });
    it('should be able to render', () => {
        expect(wrapper.render()).to.not.be.null;
    });
    describe('Typography', () => {
        let typography;
        beforeEach(() => {
            typography = wrapper.find(Typography);
        });
        it('should contain text', () => {
            const text = wrapper
                .find(Typography)
                .render()
                .text();
            expect(text).to.not.be.empty;
        });
    });
});
