import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from 'common/react/common/components/content';
import Payload from 'fixtures/spotify/processed-data/payload';
import Swipe from 'common/react/common/components/swipe';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });
const fakeData = Payload.statistics.tally.key;

const Fake = () => {
    return <div>Fake App</div>;
};

describe('react - common - components - content', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Content value={1} data={fakeData} component={Fake} />
        );
    });
    it('should render', () => {
        expect(wrapper.isEmptyRender()).to.be.false;
    });

    describe('Swipe', () => {
        let swipe;
        beforeEach(() => {
            swipe = wrapper.find(Swipe);
        });
        it('should exist', () => {
            expect(swipe).to.have.length(1);
        });
        describe('attributes', () => {
            it('should have an index', () => {
                wrapper.setState({
                    value: 1
                });
                wrapper.update();
                expect(swipe.props().index).to.be.equal(1);
            });
        });
        describe('children', () => {
            it('should exist', () => {
                expect(swipe.props().children).to.exist;
            });
            it('should have the correct length', () => {
                expect(swipe.props().children).to.have.lengthOf(3);
            });
            describe('attributes', () => {
                it('should contain a data attribute for each component', () => {
                    const components = swipe.children();
                    components.forEach((component, index) => {
                        expect(component.props().data).to.be.a('object').and.to
                            .not.be.empty;
                    });
                });
            });
        });
    });
});
