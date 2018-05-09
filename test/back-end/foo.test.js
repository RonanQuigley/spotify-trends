
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const expect = chai.expect;
let sandbox = sinon.sandbox.create();

import * as fooModule from './foo.js';

// OPTION 1 - NO REWIRE
describe('option 1', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(fooModule, 'bar').returns('Stubbed');
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should work without rewire', () => {

        expect(fooModule.foo()).to.equal('Stubbed');
    })
})

// OPTION 2 - REWIRE 

// the rewire option - looks a bit nasty.... 

// import FooModule from './foo.js';
// import { foo, __RewireAPI__ as FooModuleRewireAPI } from './foo.js';

// describe('module default export test', function () {
//     it('should demonstrate the default exported rewire api', function () {
//         expect(foo()).to.equal('Hello world');
//         FooModule.__Rewire__('bar', function () {
//             return 'my message';
//         });
//         expect(foo()).to.equal('my message');
//         FooModule.__ResetDependency__('bar');
//     });

//     it('should demonstrate the rewire apis named export', function () {
//         expect(foo()).to.equal('Hello world');
//         FooModuleRewireAPI.__Rewire__('bar', function () {
//             return 'my message';
//         });
//         expect(foo()).to.equal('my message');
//         FooModuleRewireAPI.__ResetDependency__('bar');
//     });
// });