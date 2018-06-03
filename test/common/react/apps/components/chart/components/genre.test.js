import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Genre from 'common/react/components/chart/components/genre';
import payload from 'fixtures/spotify/processed-data/payload';
import { Typography } from '@material-ui/core';

const testGenre = payload.artists.LONG[0].genres;

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Genre genre={testGenre} />);
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('Typography', () => {
        let typography;
        beforeEach(() => {
            typography = wrapper.find(Typography);
        });
        it('should exist', () => {
            expect(typography).to.have.length(1);
        });
        it('should contain a genre', () => {
            expect(typography).to.contain(testGenre);
        });
    });
});
