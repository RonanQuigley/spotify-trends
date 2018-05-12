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

process.env.NODE_ENV = 'test';
process.env.DEBUG = 'false';
