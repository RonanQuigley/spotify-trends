import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Element from 'charts/components/chart/components/element';
import Image from 'charts/components/chart/components/image';
import Payload from 'fixtures/spotify/processed-data/payload';
import { Card, CardContent } from '@material-ui/core';
import Popularity from 'charts/components/chart/components/popularity';
import Rank from 'charts/components/chart/components/rank';
import Genre from 'charts/components/chart/components/genre';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const fakeTrackData = Payload.tracks.LONG[0];
const fakeArtistData = Payload.artists.LONG[0];
const testRank = 1;

describe('react - charts - components - chart -> element', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Element item={fakeTrackData} rank={testRank} />
        ).dive();
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('Components', () => {
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
            it('should contain the name of the track from our fake data', () => {
                expect(cardContent).to.contain(fakeTrackData.name);
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
                expect(image.props().image).to.be.a('string').and.to.not.be
                    .empty;
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
        describe('Rank', () => {
            let rank;
            beforeEach(() => {
                rank = wrapper.find(Rank);
            });
            it('should exist', () => {
                expect(rank).to.have.length(1);
            });
            it('should have a rank prop', () => {
                expect(rank.props().rank).to.equal(testRank);
            });
        });

        describe('Genre', () => {
            let genre;
            beforeEach(() => {
                genre = wrapper.find(Genre);
            });
            describe('conditional render', () => {
                it('should not exist when using track data', () => {
                    expect(genre).to.not.exist;
                });
                it('should exist when using artist data', () => {
                    wrapper.setProps({
                        item: fakeArtistData
                    });
                    genre = wrapper.find(Genre);
                    expect(genre).to.exist;
                });
            });
        });
    });
});
