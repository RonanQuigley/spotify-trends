import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactDOM from 'react-dom/server';
import * as ReactAPI from 'src/server/api/react/index';
import App from 'common/react/index';

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - react', () => {
    afterEach(() => {
        sandbox.restore();
    });
    describe('rendering react app', () => {
        it('should render it to a string', () => {
            // sandbox.spy(ReactDOM, 'renderToString');
            // const fakeData = {};
            // ReactAPI.renderReactApp(fakeData);
            // const
            // expect(ReactDOM.renderToString).to.be.calledWith(
            // );
        });
    });
});
