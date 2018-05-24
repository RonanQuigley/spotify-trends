import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactDOM from 'react-dom/server';
import * as ReactAPI from 'src/server/api/react/index';
import * as test from 'src/server/api/react/test';
import App from 'common/react/index';
import enzymeChai from 'chai-enzyme';

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);
chai.use(enzymeChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - react', () => {
    afterEach(() => {
        sandbox.restore();
    });
});
