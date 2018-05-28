import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactAPI from 'src/server/api/react/index';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { id } from 'common/react/api';
import ReactDOMServer from 'react-dom/server';
import App from 'common/react/index';
import { wrap } from 'module';

chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - react', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('rendering an app', () => {
        let result;
        let build;
        beforeEach(() => {
            sandbox.spy(ReactDOMServer, 'renderToString');
            build = ReactAPI.buildApp({}, id.TRACKS);
            result = ReactAPI.renderApp(build);
        });
        describe('return value', () => {
            it('should return an object', () => {
                expect(result).to.be.a('object');
            });
            it('should contain an app', () => {
                expect(result.app).to.be.a('string');
            });
            it('should contain a style sheet registry', () => {
                expect(result.registry).to.be.a('object');
            });
        });
        it('should render the app to a string', () => {
            expect(ReactDOMServer.renderToString).to.be.calledWith(build.app)
                .calledOnce;
        });
    });
    describe('building an app', () => {
        let result;
        beforeEach(() => {
            result = ReactAPI.buildApp({}, id.TRACKS);
        });
        describe('return value', () => {
            it('should be an object', () => {
                expect(result).to.be.a('object');
            });
            it('should contain an app ', () => {
                expect(result.app).to.be.a('object');
            });
            it('should contain a style sheet registry', () => {
                expect(result.app).to.be.a('object');
            });
        });
    });
});
