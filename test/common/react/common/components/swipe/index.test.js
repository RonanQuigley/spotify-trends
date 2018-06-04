import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Swipe from 'common/react/common/components/swipe';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const Fake = () => {
    return <div>Fake App</div>;
};

describe('react - common - components - swipe', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Swipe index={1}>
                <Fake />
            </Swipe>
        );
    });
    it('should be able to render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    it('should render its children', () => {
        expect(wrapper.children()).to.have.lengthOf.at.least(1);
    });

    describe('Swipeable Views', () => {
        let swipeableViews;
        beforeEach(() => {
            swipeableViews = wrapper.find(SwipeableViews);
        });
        it('should exist', () => {
            expect(swipeableViews).to.have.length(1);
        });
        describe('attributes', () => {
            it('should have an index', () => {
                wrapper.setState({
                    value: 1
                });
                wrapper.update();
                expect(swipeableViews.props().index).to.be.equal(1);
            });
        });
    });
});
