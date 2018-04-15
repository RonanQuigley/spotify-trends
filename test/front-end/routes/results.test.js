import * as results from '../../../src/client/results';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use(sinonChai);

let sandbox = sinon.sandbox.create();

describe('front end - results', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('get url parameter', () => {
        let result;
        let windowStub;
        let decodeSpy;
        beforeEach(() => {
            decodeSpy = sandbox.spy(global, 'decodeURIComponent');
            windowStub = sandbox
                .stub(results, 'getLocationHref')
                .returns(
                    'http://localhost:3000/results?accessToken=BQAT2aLKJnMqeigp7ZwWiWCbLqDoJCjf3-ZYOiwAXOTVAQShZpWznUJY4VB4WQQLbQ4X5SeJVEpQWnlS-12FXO_xMk44gWWRBtBfZ4GsYAE2si1k-IjomoiHtrF60FJ8AnmyyknxWJxm9ue3CEv8C71wNW31-R7qnIbxDGE&refreshToken=AQD3ZPdo097a9mO9xx7_jG0jJ-N2kYBHW3qkEXLiZooruOs6n5f7S9wwU8xFCMUIf-xioGqWtvYomG7ZGKwlrowCyNvFVx48nQuXycebPJ0V1NqinM0of0NtnVW-mXOqqsE&expiryIn=3600'
                );
            result = results.getParameterByName('accessToken');
        });
        it('should return a string', () => {
            expect(result).to.be.a('string');
        });
        it('should get location href', () => {
            expect(windowStub).to.be.calledOnce;
        });
        it('should call decode uri component', () => {
            expect(decodeSpy).to.be.calledOnce;
        });
    });
});
