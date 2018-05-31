import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Element from 'common/react/components/chart/components/element';
import Image from 'common/react/components/chart/components/image';
import Payload from 'fixtures/spotify/processed-data/payload';
import { Card, CardContent } from '@material-ui/core';
import Popularity from 'common/react/components/chart/components/popularity';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('common - react - components - chart -> element', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Element item={Payload.tracks.LONG[0]} />).dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('Card', () => {
        let card;
        beforeEach(() => {
            card = wrapper.find(Card);
        });
        it('should exist', () => {
            expect(card).to.have.length(1);
        });
    });
    describe('CardContent', () => {
        let cardContent;
        beforeEach(() => {
            cardContent = wrapper.find(CardContent);
        });
        it('should exist', () => {
            expect(cardContent).to.have.length(1);
        });
    });
    describe('Image', () => {
        let image;
        beforeEach(() => {
            image = wrapper.find(Image);
        });
        it('should exist', () => {
            expect(image).to.have.length(1);
        });
        it('should contain a uri attribute', () => {
            expect(image.props().uri)
                .to.be.a('string')
                .and.contains('spotify');
        });
        it('should contain a image attribute', () => {
            expect(image.props().image).to.be.a('string').and.to.not.be.empty;
        });
    });
    describe('Popularity', () => {
        let popularity;
        beforeEach(() => {
            popularity = wrapper.find(Popularity);
        });
        it('should exist', () => {
            expect(popularity).to.have.length(1);
        });
        it('should have a rating attribute', () => {
            expect(popularity.props().rating)
                .to.be.a('number')
                .and.to.be.within(0, 100);
        });
    });
});
