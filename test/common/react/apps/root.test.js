import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withRoot from 'src/common/react/root';
import chaiEnzyme from 'chai-enzyme';
import { MuiThemeProvider } from '@material-ui/core';
chai.use(sinonChai);
chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

const Fake = () => {
    return <div />;
};

describe('common - react - root (Higher Order Component) ', () => {
    let wrapper;
    beforeEach(() => {
        const HOC = withRoot(Fake);
        wrapper = shallow(<HOC map={new Map()} />);
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('MuiThemeProvider', () => {
        let muiTheme;
        beforeEach(() => {
            muiTheme = wrapper.find(MuiThemeProvider);
        });
        it('should have a theme', () => {
            expect(muiTheme.props().theme).to.be.a('object');
        });
        it('should have a sheets manager', () => {
            expect(muiTheme.props().sheetsManager).to.be.instanceof(Map);
        });
    });
});