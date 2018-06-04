import chai from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withRoot from 'common/react/common/components/root';
import chaiEnzyme from 'chai-enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import { styleID } from 'src/server/api/react/utilities';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;

const Fake = () => {
    return <div />;
};

describe('react - common - components - root', () => {
    let wrapper;
    beforeEach(() => {
        const HOC = withRoot(Fake);
        wrapper = shallow(<HOC ssrID={styleID.ARTISTS} map={new Map()} />);
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
