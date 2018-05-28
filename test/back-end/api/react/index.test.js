import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import renderApp from 'src/server/api/react/index';
import { id } from 'common/react/api';
import ReactDOMServer from 'react-dom/server';

chai.use(sinonChai);

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('back end - api - react', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('rendering an app', () => {
        let result;
        beforeEach(() => {
            sandbox.spy(ReactDOMServer, 'renderToString');
            result = renderApp({}, id.TRACKS);
        });
        describe('return value', () => {
            it('should return an object', () => {
                expect(result).to.be.a('object');
            });
            it('should contain an app', () => {
                expect(result.html).to.be.a('string').and.to.not.be.empty;
            });
            it('should contain a style sheet registry', () => {
                expect(result.css).to.be.a('string').and.to.not.be.empty;
            });
        });
        it('should render the app to a string', () => {
            expect(ReactDOMServer.renderToString).to.be.calledWith(
                sinon.match.object
            ).and.to.be.calledOnce;
        });
    });
});
