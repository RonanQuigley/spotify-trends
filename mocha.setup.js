require('babel-polyfill');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = new JSDOM('').window;

// setup our globals with jsdom for unit tests
global.document = document;
global.window = document.defaultView;
window.console = global.console;

Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

if (process.env.DEBUG === 'true') {
    const requireHacker = require('require-hacker');

    function fakeHandlebars() {
        return '';
    }

    requireHacker.hook('hbs', () => `module.exports = ${fakeHandlebars}`);
}

process.env.NODE_ENV = 'test';
process.env.ENABLE_LOGGING = 'false';
